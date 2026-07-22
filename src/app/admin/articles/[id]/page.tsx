import { notFound, redirect } from "next/navigation";

import { ArticleForm } from "@/components/admin/ArticleForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { canPublish, getStaffProfile } from "@/lib/admin/auth";
import type { ArticleRow } from "@/lib/admin/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const { id } = await params;
  const profile = await getStaffProfile();
  const allowPublish = profile ? canPublish(profile) : false;

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.articles)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const article = data as ArticleRow;

  return (
    <div>
      <PageHeader
        title={article.title}
        description="Update article content and publishing status."
      />
      <Card>
        <ArticleForm article={article} canPublish={allowPublish} />
      </Card>
    </div>
  );
}
