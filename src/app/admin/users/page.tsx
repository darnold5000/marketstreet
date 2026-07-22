import { redirect } from "next/navigation";

import { inviteUser, setUserActive } from "@/lib/admin/actions";
import { getStaffProfile } from "@/lib/admin/auth";
import type { StaffProfile } from "@/lib/admin/auth";
import { formatDateTime } from "@/lib/admin/utils";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  PageHeader,
  Select,
} from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

type ProfileRow = StaffProfile & {
  created_at?: string;
  updated_at?: string;
};

async function inviteAction(formData: FormData) {
  "use server";
  await inviteUser(formData);
  redirect("/admin/users");
}

async function toggleActiveAction(formData: FormData) {
  "use server";
  const userId = String(formData.get("user_id") || "");
  const active = String(formData.get("active") || "") === "true";
  if (!userId) return;
  await setUserActive(userId, active);
  redirect("/admin/users");
}

export default async function UsersPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const profile = await getStaffProfile();
  if (!profile || profile.role !== "administrator") {
    redirect("/admin");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.profiles)
    .select("id, email, full_name, role, active, created_at, updated_at")
    .order("created_at", { ascending: false });

  const users = (data ?? []) as ProfileRow[];

  return (
    <div>
      <PageHeader
        title="Users"
        description="Invite editors and manage staff access."
      />

      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Invite user
        </h2>
        <form
          action={inviteAction}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Field label="Full name">
            <Input name="full_name" required />
          </Field>
          <Field label="Email">
            <Input name="email" type="email" required />
          </Field>
          <Field label="Role">
            <Select name="role" defaultValue="editor">
              <option value="editor">Editor</option>
              <option value="administrator">Administrator</option>
            </Select>
          </Field>
          <div className="flex items-end">
            <Button type="submit">Send invite</Button>
          </div>
        </form>
      </Card>

      {users.length === 0 ? (
        <EmptyState title="No users" description="Invite your first editor." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {user.full_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">
                    {user.role}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={user.active ? "success" : "neutral"}>
                      {user.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDateTime(user.updated_at ?? user.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      {user.id === profile.id ? (
                        <span className="text-xs text-slate-400">You</span>
                      ) : (
                        <form action={toggleActiveAction}>
                          <input type="hidden" name="user_id" value={user.id} />
                          <input
                            type="hidden"
                            name="active"
                            value={user.active ? "false" : "true"}
                          />
                          <Button
                            size="sm"
                            variant={user.active ? "ghost" : "secondary"}
                            type="submit"
                          >
                            {user.active ? "Deactivate" : "Activate"}
                          </Button>
                        </form>
                      )}
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
