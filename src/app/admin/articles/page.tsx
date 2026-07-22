import { redirect } from "next/navigation";
import Link from "next/link";

import { deleteArticle } from "@/lib/admin/actions";
import type { ArticleRow } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/utils";
import {
  Badge,
  Button,
  EmptyState,
  PageHeader,
} from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteArticle(id);
}

function statusTone(status: ArticleRow["status"]) {
  if (status === "published") return "success" as const;
  if (status === "archived") return "neutral" as const;
  return "warning" as const;
}

export default async function ArticlesListPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.articles)
    .select("*")
    .order("updated_at", { ascending: false });

  const articles = (data ?? []) as ArticleRow[];

  return (
    <div>
      <PageHeader
        title="Articles"
        description="Guides and resources published on the site."
        actions={
          <Link href="/admin/articles/new">
            <Button>New article</Button>
          </Link>
        }
      />

      {articles.length === 0 ? (
        <EmptyState
          title="No articles"
          description="Create a draft or publish a new resource."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Publish date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {article.category || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(article.status)}>
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(article.publish_date)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/articles/${article.id}`}>
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                      </Link>
                      <form action={deleteAction}>
                        <input type="hidden" name="id" value={article.id} />
                        <Button size="sm" variant="danger" type="submit">
                          Delete
                        </Button>
                      </form>
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
