import { redirect } from "next/navigation";

import { TeamForm } from "@/components/admin/TeamForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default function NewTeamMemberPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  return (
    <div>
      <PageHeader
        title="Add team member"
        description="Create a new advisor or staff profile."
      />
      <Card>
        <TeamForm />
      </Card>
    </div>
  );
}
