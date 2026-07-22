import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES, type StaffRole } from "@/lib/supabase/tables";

export type StaffProfile = {
  id: string;
  email: string;
  full_name: string;
  role: StaffRole;
  active: boolean;
};

export async function getStaffProfile(): Promise<StaffProfile | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from(MS_TABLES.profiles)
    .select("id, email, full_name, role, active")
    .eq("id", user.id)
    .maybeSingle();

  if (!data || !data.active) return null;
  if (data.role !== "administrator" && data.role !== "editor") return null;

  return data as StaffProfile;
}

export async function requireStaff(): Promise<StaffProfile> {
  const profile = await getStaffProfile();
  if (!profile) {
    throw new Error("Unauthorized");
  }
  return profile;
}

export async function requireAdministrator(): Promise<StaffProfile> {
  const profile = await requireStaff();
  if (profile.role !== "administrator") {
    throw new Error("Forbidden");
  }
  return profile;
}

export function canPublish(profile: StaffProfile): boolean {
  return profile.role === "administrator";
}

export function canManageUsers(profile: StaffProfile): boolean {
  return profile.role === "administrator";
}

export function canManageSettings(profile: StaffProfile): boolean {
  return profile.role === "administrator";
}
