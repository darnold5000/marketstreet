-- Create ms_profiles when Market Street staff are invited with ms_role metadata.
-- Does not run for MA5-only invites (no ms_role in user metadata).

create or replace function public.ms_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ms_role text := new.raw_user_meta_data ->> 'ms_role';
begin
  if ms_role is null or ms_role not in ('administrator', 'editor') then
    return new;
  end if;

  insert into public.ms_profiles (
    id,
    email,
    full_name,
    role,
    active
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    ms_role,
    coalesce((new.raw_user_meta_data ->> 'ms_active') = 'true', true)
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.ms_profiles.full_name),
    role = excluded.role,
    active = excluded.active;

  return new;
end;
$$;

drop trigger if exists ms_on_auth_user_created on auth.users;
create trigger ms_on_auth_user_created
  after insert on auth.users
  for each row execute function public.ms_handle_new_user();
