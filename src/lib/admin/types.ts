export type TeamMemberRow = {
  id: string;
  full_name: string;
  professional_title: string;
  short_bio: string;
  full_bio: string;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  office_location: string | null;
  years_experience: number | null;
  credentials: string;
  areas_of_focus: string[];
  display_order: number;
  active: boolean;
  featured: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleRow = {
  id: string;
  title: string;
  summary: string;
  category: string;
  featured_image_url: string | null;
  document_url: string | null;
  document_filename: string | null;
  document_mime: string | null;
  publish_date: string | null;
  status: "draft" | "published" | "archived";
  slug: string | null;
  created_at: string;
  updated_at: string;
};

export type PageContentRow = {
  id: string;
  page_key: string;
  title: string;
  content: Record<string, unknown>;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
};

export type SiteSettingsRow = {
  id: number;
  office_name: string;
  address: string;
  phone: string;
  email: string;
  business_hours: string;
  social_links: Record<string, string>;
  logo_url: string | null;
  favicon_url: string | null;
  footer_text: string;
  updated_at: string;
};

export type MediaAssetRow = {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  folder: "team" | "articles" | "pages" | "branding";
  mime_type: string;
  size_bytes: number;
  alt_text: string;
  width: number | null;
  height: number | null;
  created_at: string;
};

export type ActivityLogRow = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  summary: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type HomepageContent = {
  headline: string;
  intro: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
  hero_image_url: string;
  featured_advisor_id: string | null;
  featured_resource_ids: string[];
};
