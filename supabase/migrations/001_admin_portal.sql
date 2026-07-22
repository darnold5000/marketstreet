-- Market Street / NorthBridge content admin portal.
-- Public-website content only. No CRM / client data.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers (table-independent first)
-- ---------------------------------------------------------------------------

create or replace function public.ms_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Profiles (admin portal users — not customers)
-- Create table BEFORE role helpers that reference it.
-- ---------------------------------------------------------------------------

create table if not exists public.ms_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null check (role in ('administrator', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ms_profiles_role_idx on public.ms_profiles (role);
create index if not exists ms_profiles_active_idx on public.ms_profiles (active);

drop trigger if exists ms_profiles_updated_at on public.ms_profiles;
create trigger ms_profiles_updated_at
  before update on public.ms_profiles
  for each row execute function public.ms_set_updated_at();

-- Role helpers (require ms_profiles to exist)
create or replace function public.ms_is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.ms_profiles p
    where p.id = auth.uid()
      and p.role in ('administrator', 'editor')
      and p.active = true
  );
$$;

create or replace function public.ms_is_administrator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.ms_profiles p
    where p.id = auth.uid()
      and p.role = 'administrator'
      and p.active = true
  );
$$;

alter table public.ms_profiles enable row level security;

drop policy if exists ms_profiles_select_self_or_admin on public.ms_profiles;
create policy ms_profiles_select_self_or_admin
  on public.ms_profiles for select
  to authenticated
  using (id = auth.uid() or public.ms_is_administrator());

drop policy if exists ms_profiles_update_self on public.ms_profiles;
create policy ms_profiles_update_self
  on public.ms_profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists ms_profiles_admin_all on public.ms_profiles;
create policy ms_profiles_admin_all
  on public.ms_profiles for all
  to authenticated
  using (public.ms_is_administrator())
  with check (public.ms_is_administrator());

-- Auto-create profile on signup is intentionally omitted — no public registration.
-- Administrators invite users via service role.

-- ---------------------------------------------------------------------------
-- Team members
-- ---------------------------------------------------------------------------

create table if not exists public.ms_team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  professional_title text not null default '',
  short_bio text not null default '',
  full_bio text not null default '',
  photo_url text,
  phone text,
  email text,
  office_location text,
  years_experience integer,
  credentials text not null default '',
  areas_of_focus text[] not null default '{}',
  display_order integer not null default 0,
  active boolean not null default true,
  featured boolean not null default false,
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.ms_profiles (id) on delete set null
);

create index if not exists ms_team_members_active_order_idx
  on public.ms_team_members (active, display_order);
create index if not exists ms_team_members_featured_idx
  on public.ms_team_members (featured) where featured = true;

drop trigger if exists ms_team_members_updated_at on public.ms_team_members;
create trigger ms_team_members_updated_at
  before update on public.ms_team_members
  for each row execute function public.ms_set_updated_at();

alter table public.ms_team_members enable row level security;

drop policy if exists ms_team_members_public_read on public.ms_team_members;
create policy ms_team_members_public_read
  on public.ms_team_members for select
  to anon, authenticated
  using (active = true or public.ms_is_staff());

drop policy if exists ms_team_members_staff_write on public.ms_team_members;
create policy ms_team_members_staff_write
  on public.ms_team_members for all
  to authenticated
  using (public.ms_is_staff())
  with check (public.ms_is_staff());

-- ---------------------------------------------------------------------------
-- Articles (document uploads — PDF/DOCX, not rich text)
-- ---------------------------------------------------------------------------

create table if not exists public.ms_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  category text not null default 'General',
  featured_image_url text,
  document_url text,
  document_filename text,
  document_mime text,
  publish_date date,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.ms_profiles (id) on delete set null
);

create index if not exists ms_articles_status_date_idx
  on public.ms_articles (status, publish_date desc);
create index if not exists ms_articles_category_idx
  on public.ms_articles (category);

drop trigger if exists ms_articles_updated_at on public.ms_articles;
create trigger ms_articles_updated_at
  before update on public.ms_articles
  for each row execute function public.ms_set_updated_at();

alter table public.ms_articles enable row level security;

drop policy if exists ms_articles_public_read on public.ms_articles;
create policy ms_articles_public_read
  on public.ms_articles for select
  to anon, authenticated
  using (status = 'published' or public.ms_is_staff());

drop policy if exists ms_articles_staff_write on public.ms_articles;
create policy ms_articles_staff_write
  on public.ms_articles for all
  to authenticated
  using (public.ms_is_staff())
  with check (public.ms_is_staff());

-- Editors can save drafts; only administrators may set status = published
-- when approval is required. Enforced in app layer; optional DB guard below.

create or replace function public.ms_articles_publish_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'published'
     and (tg_op = 'INSERT' or coalesce(old.status, '') is distinct from 'published')
     and not public.ms_is_administrator() then
    -- Editors may not publish; keep as draft unless already published by admin
    if tg_op = 'UPDATE' and old.status = 'published' then
      new.status := 'published';
    else
      raise exception 'Only administrators can publish articles';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists ms_articles_publish_guard on public.ms_articles;
create trigger ms_articles_publish_guard
  before insert or update on public.ms_articles
  for each row execute function public.ms_articles_publish_guard();

-- ---------------------------------------------------------------------------
-- Page content (structured JSON per page key)
-- ---------------------------------------------------------------------------

create table if not exists public.ms_page_content (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  title text not null default '',
  content jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.ms_profiles (id) on delete set null
);

drop trigger if exists ms_page_content_updated_at on public.ms_page_content;
create trigger ms_page_content_updated_at
  before update on public.ms_page_content
  for each row execute function public.ms_set_updated_at();

alter table public.ms_page_content enable row level security;

drop policy if exists ms_page_content_public_read on public.ms_page_content;
create policy ms_page_content_public_read
  on public.ms_page_content for select
  to anon, authenticated
  using (status = 'published' or public.ms_is_staff());

drop policy if exists ms_page_content_staff_write on public.ms_page_content;
create policy ms_page_content_staff_write
  on public.ms_page_content for all
  to authenticated
  using (public.ms_is_staff())
  with check (public.ms_is_staff());

insert into public.ms_page_content (page_key, title, content, status)
values
  (
    'homepage',
    'Homepage',
    '{
      "headline": "Fee-Only Fiduciary Financial Planning",
      "intro": "Clear, actionable guidance for every stage of your financial life.",
      "cta_primary_label": "Schedule a Conversation",
      "cta_primary_href": "/schedule",
      "cta_secondary_label": "Meet the Team",
      "cta_secondary_href": "/team",
      "hero_image_url": "",
      "featured_advisor_id": null,
      "featured_resource_ids": []
    }'::jsonb,
    'published'
  ),
  (
    'about',
    'About',
    '{
      "headline": "About NorthBridge Wealth",
      "intro": "Fee-only fiduciary advisors serving Indiana and clients nationwide.",
      "body": ""
    }'::jsonb,
    'published'
  ),
  (
    'contact',
    'Contact',
    '{
      "headline": "Contact Us",
      "intro": "We would love to hear from you.",
      "form_note": ""
    }'::jsonb,
    'published'
  ),
  (
    'footer',
    'Footer',
    '{
      "footer_text": "Fee-only fiduciary financial planning.",
      "show_social": true
    }'::jsonb,
    'published'
  ),
  (
    'office',
    'Office Information',
    '{
      "offices": []
    }'::jsonb,
    'published'
  )
on conflict (page_key) do nothing;

-- ---------------------------------------------------------------------------
-- Site settings (single row)
-- ---------------------------------------------------------------------------

create table if not exists public.ms_site_settings (
  id integer primary key default 1 check (id = 1),
  office_name text not null default 'NorthBridge Wealth',
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  business_hours text not null default '',
  social_links jsonb not null default '{}'::jsonb,
  logo_url text,
  favicon_url text,
  footer_text text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references public.ms_profiles (id) on delete set null
);

drop trigger if exists ms_site_settings_updated_at on public.ms_site_settings;
create trigger ms_site_settings_updated_at
  before update on public.ms_site_settings
  for each row execute function public.ms_set_updated_at();

alter table public.ms_site_settings enable row level security;

drop policy if exists ms_site_settings_public_read on public.ms_site_settings;
create policy ms_site_settings_public_read
  on public.ms_site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists ms_site_settings_admin_write on public.ms_site_settings;
create policy ms_site_settings_admin_write
  on public.ms_site_settings for all
  to authenticated
  using (public.ms_is_administrator())
  with check (public.ms_is_administrator());

insert into public.ms_site_settings (
  id, office_name, address, phone, email, business_hours, social_links, footer_text
) values (
  1,
  'NorthBridge Wealth',
  '8450 North Bridge Parkway, Suite 200, Carmel, IN 46032',
  '(317) 555-0148',
  'hello@northbridgewealth.com',
  'Monday – Friday: 8:00 AM – 5:00 PM',
  '{"linkedin":"https://www.linkedin.com/company/northbridge-wealth","facebook":"https://www.facebook.com/northbridgewealth"}'::jsonb,
  'Fee-only fiduciary financial planning.'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Media assets
-- ---------------------------------------------------------------------------

create table if not exists public.ms_media_assets (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null unique,
  public_url text not null,
  folder text not null check (folder in ('team', 'articles', 'pages', 'branding')),
  mime_type text not null,
  size_bytes bigint not null default 0,
  alt_text text not null default '',
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  created_by uuid references public.ms_profiles (id) on delete set null
);

create index if not exists ms_media_assets_folder_idx on public.ms_media_assets (folder);
create index if not exists ms_media_assets_filename_idx on public.ms_media_assets (filename);

alter table public.ms_media_assets enable row level security;

drop policy if exists ms_media_assets_public_read on public.ms_media_assets;
create policy ms_media_assets_public_read
  on public.ms_media_assets for select
  to anon, authenticated
  using (true);

drop policy if exists ms_media_assets_staff_write on public.ms_media_assets;
create policy ms_media_assets_staff_write
  on public.ms_media_assets for all
  to authenticated
  using (public.ms_is_staff())
  with check (public.ms_is_staff());

-- ---------------------------------------------------------------------------
-- Activity log
-- ---------------------------------------------------------------------------

create table if not exists public.ms_activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.ms_profiles (id) on delete set null,
  actor_email text,
  action text not null,
  entity_type text not null,
  entity_id text,
  summary text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ms_activity_log_created_idx
  on public.ms_activity_log (created_at desc);
create index if not exists ms_activity_log_entity_idx
  on public.ms_activity_log (entity_type, entity_id);

alter table public.ms_activity_log enable row level security;

drop policy if exists ms_activity_log_admin_read on public.ms_activity_log;
create policy ms_activity_log_admin_read
  on public.ms_activity_log for select
  to authenticated
  using (public.ms_is_administrator());

drop policy if exists ms_activity_log_staff_insert on public.ms_activity_log;
create policy ms_activity_log_staff_insert
  on public.ms_activity_log for insert
  to authenticated
  with check (public.ms_is_staff());

-- ---------------------------------------------------------------------------
-- Storage bucket + policies
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ms-media',
  'ms-media',
  true,
  20971520,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists ms_media_storage_public_read on storage.objects;
create policy ms_media_storage_public_read
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'ms-media');

drop policy if exists ms_media_storage_staff_insert on storage.objects;
create policy ms_media_storage_staff_insert
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'ms-media' and public.ms_is_staff());

drop policy if exists ms_media_storage_staff_update on storage.objects;
create policy ms_media_storage_staff_update
  on storage.objects for update
  to authenticated
  using (bucket_id = 'ms-media' and public.ms_is_staff())
  with check (bucket_id = 'ms-media' and public.ms_is_staff());

drop policy if exists ms_media_storage_staff_delete on storage.objects;
create policy ms_media_storage_staff_delete
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'ms-media' and public.ms_is_staff());
