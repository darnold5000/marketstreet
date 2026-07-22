import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { canPublish, getStaffProfile } from "@/lib/admin/auth";

export default async function NewArticlePage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const profile = await getStaffProfile();
  const allowPublish = profile ? canPublish(profile) : false;

  return (
    <div>
      <PageHeader
        title="New article"
        description="Create a draft or publish a resource."
      />
      <Card>
        <ArticleForm canPublish={allowPublish} />
      </Card>
    </div>
  );
}
