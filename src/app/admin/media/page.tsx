import { redirect } from "next/navigation";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { PageHeader } from "@/components/admin/ui";
import type { MediaAssetRow } from "@/lib/admin/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const supabase = await createClient();
  let request = supabase
    .from(MS_TABLES.mediaAssets)
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    request = request.ilike("filename", `%${query}%`);
  }

  const { data } = await request;
  const assets = (data ?? []) as MediaAssetRow[];

  return (
    <div>
      <PageHeader
        title="Media"
        description="Upload and manage images and documents."
      />
      <MediaLibrary assets={assets} initialQuery={query} />
    </div>
  );
}
