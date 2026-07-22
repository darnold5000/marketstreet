import { redirect } from "next/navigation";
import Link from "next/link";

import {
  archiveTeamMember,
} from "@/lib/admin/actions";
import type { TeamMemberRow } from "@/lib/admin/types";
import {
  Badge,
  Button,
  EmptyState,
  PageHeader,
} from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

async function archiveAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await archiveTeamMember(id);
}

export default async function TeamListPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.teamMembers)
    .select("*")
    .order("display_order", { ascending: true });

  const members = (data ?? []) as TeamMemberRow[];

  return (
    <div>
      <PageHeader
        title="Team"
        description="Manage advisors and staff shown on the website."
        actions={
          <Link href="/admin/team/new">
            <Button>Add team member</Button>
          </Link>
        }
      />

      {members.length === 0 ? (
        <EmptyState
          title="No team members"
          description="Add your first advisor or staff profile."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {member.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.photo_url}
                          alt=""
                          className="h-10 w-10 rounded-md border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-xs font-medium text-slate-500">
                          {member.full_name.slice(0, 1)}
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/admin/team/${member.id}`}
                          className="font-medium text-slate-900 hover:underline"
                        >
                          {member.full_name}
                        </Link>
                        {member.featured ? (
                          <p className="text-xs text-slate-500">Featured</p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {member.professional_title || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={member.active ? "success" : "neutral"}>
                      {member.active ? "Active" : "Archived"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {member.display_order}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/team/${member.id}`}>
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                      </Link>
                      {member.active ? (
                        <form action={archiveAction}>
                          <input type="hidden" name="id" value={member.id} />
                          <Button size="sm" variant="ghost" type="submit">
                            Archive
                          </Button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
