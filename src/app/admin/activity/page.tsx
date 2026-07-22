import { redirect } from "next/navigation";

import { getStaffProfile } from "@/lib/admin/auth";
import type { ActivityLogRow } from "@/lib/admin/types";
import { formatDateTime } from "@/lib/admin/utils";
import { Badge, EmptyState, PageHeader } from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

export default async function ActivityPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const profile = await getStaffProfile();
  if (!profile || profile.role !== "administrator") {
    redirect("/admin");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.activityLog)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const rows = (data ?? []) as ActivityLogRow[];

  return (
    <div>
      <PageHeader
        title="Activity"
        description="Recent content and admin actions."
      />

      {rows.length === 0 ? (
        <EmptyState
          title="No activity yet"
          description="Edits and uploads will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Actor</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {formatDateTime(row.created_at)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {row.actor_email ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="neutral">{row.action}</Badge>
                    <span className="ml-2 text-xs text-slate-500">
                      {row.entity_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
