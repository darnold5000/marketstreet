import { AdminShell } from "@/components/admin/AdminShell";
import { getStaffProfile } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile = null;

  if (isSupabaseConfigured()) {
    try {
      profile = await getStaffProfile();
    } catch {
      profile = null;
    }
  }

  // Legacy /admin/content is password-gated and may run without Supabase staff auth.
  // Middleware protects other admin routes when Supabase is configured.
  if (profile) {
    return <AdminShell profile={profile}>{children}</AdminShell>;
  }

  return <>{children}</>;
}
