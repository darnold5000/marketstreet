import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

import type {
  ArticleRow,
  HomepageContent,
  PageContentRow,
  SiteSettingsRow,
  TeamMemberRow,
} from "@/lib/admin/types";
import { MS_TABLES } from "@/lib/supabase/tables";
import { teamMembers as staticTeam } from "@/content/team";
import { siteConfig } from "@/content/site";

function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export const getPublishedTeamMembers = unstable_cache(
  async (): Promise<TeamMemberRow[]> => {
    if (!isConfigured()) return [];
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from(MS_TABLES.teamMembers)
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error || !data?.length) return [];
      return data as TeamMemberRow[];
    } catch {
      return [];
    }
  },
  ["ms-published-team"],
  { tags: ["ms-public-content"], revalidate: 60 },
);

export const getPublishedArticles = unstable_cache(
  async (): Promise<ArticleRow[]> => {
    if (!isConfigured()) return [];
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from(MS_TABLES.articles)
        .select("*")
        .eq("status", "published")
        .order("publish_date", { ascending: false });
      if (error || !data) return [];
      return data as ArticleRow[];
    } catch {
      return [];
    }
  },
  ["ms-published-articles"],
  { tags: ["ms-public-content"], revalidate: 60 },
);

export const getPublishedPage = unstable_cache(
  async (pageKey: string): Promise<PageContentRow | null> => {
    if (!isConfigured()) return null;
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from(MS_TABLES.pageContent)
        .select("*")
        .eq("page_key", pageKey)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return null;
      return data as PageContentRow;
    } catch {
      return null;
    }
  },
  ["ms-published-page"],
  { tags: ["ms-public-content"], revalidate: 60 },
);

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsRow | null> => {
    if (!isConfigured()) return null;
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from(MS_TABLES.siteSettings)
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error || !data) return null;
      return data as SiteSettingsRow;
    } catch {
      return null;
    }
  },
  ["ms-site-settings"],
  { tags: ["ms-public-content"], revalidate: 60 },
);

export async function getHomepageContent(): Promise<HomepageContent> {
  const page = await getPublishedPage("homepage");
  const content = (page?.content ?? {}) as Partial<HomepageContent>;
  return {
    headline: content.headline || siteConfig.tagline,
    intro: content.intro || siteConfig.description,
    cta_primary_label: content.cta_primary_label || "Schedule a Conversation",
    cta_primary_href: content.cta_primary_href || "/schedule",
    cta_secondary_label: content.cta_secondary_label || "Meet the Team",
    cta_secondary_href: content.cta_secondary_href || "/team",
    hero_image_url: content.hero_image_url || "",
    featured_advisor_id: content.featured_advisor_id ?? null,
    featured_resource_ids: content.featured_resource_ids ?? [],
  };
}

/** Prefer CMS team when present; otherwise fall back to static content. */
export async function resolveTeamForPublic() {
  const fromDb = await getPublishedTeamMembers();
  if (fromDb.length > 0) {
    return fromDb.map((m) => ({
      slug: m.slug || m.id,
      name: m.full_name,
      credentials: m.credentials,
      title: m.professional_title,
      role: "advisor" as const,
      specialties: m.areas_of_focus,
      bio: m.full_bio || m.short_bio,
      photo: m.photo_url || undefined,
      withFirmSince: "",
      industrySince: m.years_experience
        ? String(new Date().getFullYear() - m.years_experience)
        : "",
      education: undefined,
      certifications: m.credentials || undefined,
      featured: m.featured,
    }));
  }
  return staticTeam;
}
