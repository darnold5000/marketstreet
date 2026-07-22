export const MS_TABLES = {
  profiles: "ms_profiles",
  teamMembers: "ms_team_members",
  articles: "ms_articles",
  pageContent: "ms_page_content",
  siteSettings: "ms_site_settings",
  mediaAssets: "ms_media_assets",
  activityLog: "ms_activity_log",
} as const;

export const MS_STORAGE_BUCKET = "ms-media";

export const MEDIA_FOLDERS = ["team", "articles", "pages", "branding"] as const;
export type MediaFolder = (typeof MEDIA_FOLDERS)[number];

export const PAGE_KEYS = [
  "homepage",
  "about",
  "contact",
  "footer",
  "office",
] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export type StaffRole = "administrator" | "editor";
export type ArticleStatus = "draft" | "published" | "archived";
export type PageStatus = "draft" | "published";
