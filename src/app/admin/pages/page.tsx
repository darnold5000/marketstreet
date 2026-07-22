import { redirect } from "next/navigation";
import Link from "next/link";

import type { PageContentRow } from "@/lib/admin/types";
import { formatDateTime } from "@/lib/admin/utils";
import { Badge, EmptyState, PageHeader } from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES, PAGE_KEYS } from "@/lib/supabase/tables";

export default async function PagesListPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.pageContent)
    .select("*")
    .order("page_key", { ascending: true });

  const rows = (data ?? []) as PageContentRow[];
  const byKey = new Map(rows.map((row) => [row.page_key, row]));

  const pages = PAGE_KEYS.map((key) => {
    const row = byKey.get(key);
    return {
      page_key: key,
      title: row?.title || key.charAt(0).toUpperCase() + key.slice(1),
      status: row?.status ?? ("draft" as const),
      updated_at: row?.updated_at ?? null,
      exists: Boolean(row),
    };
  });

  return (
    <div>
      <PageHeader
        title="Pages"
        description="Edit structured website page content."
      />

      {pages.length === 0 ? (
        <EmptyState title="No pages configured" />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Page</th>
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((page) => (
                <tr key={page.page_key} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/pages/${page.page_key}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {page.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{page.page_key}</td>
                  <td className="px-4 py-3">
                    <Badge
                      tone={page.status === "published" ? "success" : "warning"}
                    >
                      {page.exists ? page.status : "not created"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDateTime(page.updated_at)}
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
