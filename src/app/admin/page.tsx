import { redirect } from "next/navigation";
import Link from "next/link";

import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { getStaffProfile } from "@/lib/admin/auth";
import type { ActivityLogRow } from "@/lib/admin/types";
import { formatDateTime } from "@/lib/admin/utils";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const profile = await getStaffProfile();
  const supabase = await createClient();

  const [
    { count: teamCount },
    { count: articlesCount },
    { count: draftsCount },
  ] = await Promise.all([
    supabase
      .from(MS_TABLES.teamMembers)
      .select("*", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from(MS_TABLES.articles)
      .select("*", { count: "exact", head: true }),
    supabase
      .from(MS_TABLES.articles)
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
  ]);

  let recent: {
    id: string;
    label: string;
    meta: string;
    href?: string;
  }[] = [];

  if (profile?.role === "administrator") {
    const { data } = await supabase
      .from(MS_TABLES.activityLog)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);

    recent = ((data ?? []) as ActivityLogRow[]).map((row) => ({
      id: row.id,
      label: row.summary,
      meta: `${row.actor_email ?? "system"} · ${formatDateTime(row.created_at)}`,
      href: "/admin/activity",
    }));
  } else {
    const [{ data: team }, { data: articles }] = await Promise.all([
      supabase
        .from(MS_TABLES.teamMembers)
        .select("id, full_name, updated_at")
        .order("updated_at", { ascending: false })
        .limit(4),
      supabase
        .from(MS_TABLES.articles)
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(4),
    ]);

    recent = [
      ...(team ?? []).map((row) => ({
        id: `team-${row.id}`,
        label: `Team: ${row.full_name}`,
        meta: formatDateTime(row.updated_at),
        href: `/admin/team/${row.id}`,
      })),
      ...(articles ?? []).map((row) => ({
        id: `article-${row.id}`,
        label: `Article: ${row.title}`,
        meta: formatDateTime(row.updated_at),
        href: `/admin/articles/${row.id}`,
      })),
    ]
      .sort((a, b) => (a.meta < b.meta ? 1 : -1))
      .slice(0, 8);
  }

  const stats = [
    { label: "Active team", value: teamCount ?? 0, href: "/admin/team" },
    { label: "Articles", value: articlesCount ?? 0, href: "/admin/articles" },
    { label: "Drafts", value: draftsCount ?? 0, href: "/admin/articles" },
  ];

  const actions = [
    { href: "/admin/team/new", label: "Add Team Member" },
    { href: "/admin/articles/new", label: "Upload Article" },
    { href: "/admin/pages/homepage", label: "Edit Homepage" },
    { href: "/", label: "View Website", external: true },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Welcome back${profile?.full_name ? `, ${profile.full_name}` : ""}.`}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition hover:border-slate-300">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            Quick actions
          </h2>
          <div className="flex flex-wrap gap-2">
            {actions.map((action) =>
              action.external ? (
                <a
                  key={action.href}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                >
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-slate-50"
                >
                  {action.label}
                </Link>
              ),
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent updates
            </h2>
            {profile?.role === "administrator" ? (
              <Badge tone="neutral">Activity</Badge>
            ) : null}
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-500">No recent updates yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recent.map((item) => (
                <li key={item.id} className="py-2.5">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block text-sm text-slate-800 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p className="text-sm text-slate-800">{item.label}</p>
                  )}
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
