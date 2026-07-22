import { notFound, redirect } from "next/navigation";

import { PageEditor } from "@/components/admin/PageEditor";
import { Card, PageHeader } from "@/components/admin/ui";
import { canPublish, getStaffProfile } from "@/lib/admin/auth";
import type { PageContentRow } from "@/lib/admin/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES, PAGE_KEYS, type PageKey } from "@/lib/supabase/tables";

export default async function EditPageContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const { slug } = await params;
  if (!PAGE_KEYS.includes(slug as PageKey)) {
    notFound();
  }
  const pageKey = slug as PageKey;

  const profile = await getStaffProfile();
  const allowPublish = profile ? canPublish(profile) : false;

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.pageContent)
    .select("*")
    .eq("page_key", pageKey)
    .maybeSingle();

  const page = (data as PageContentRow | null) ?? null;
  const title =
    page?.title ||
    pageKey.charAt(0).toUpperCase() + pageKey.slice(1).replace(/_/g, " ");

  return (
    <div>
      <PageHeader
        title={title}
        description={`Edit structured content for “${pageKey}”.`}
      />
      <Card>
        <PageEditor
          pageKey={pageKey}
          page={page}
          canPublish={allowPublish}
        />
      </Card>
    </div>
  );
}
