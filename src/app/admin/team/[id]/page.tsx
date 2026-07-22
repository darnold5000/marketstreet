import { notFound, redirect } from "next/navigation";

import { TeamForm } from "@/components/admin/TeamForm";
import { Card, PageHeader } from "@/components/admin/ui";
import type { TeamMemberRow } from "@/lib/admin/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.teamMembers)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const member = data as TeamMemberRow;

  return (
    <div>
      <PageHeader
        title={member.full_name}
        description="Update profile details and visibility."
      />
      <Card>
        <TeamForm member={member} />
      </Card>
    </div>
  );
}
