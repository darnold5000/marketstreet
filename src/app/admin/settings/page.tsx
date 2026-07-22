import { redirect } from "next/navigation";

import { saveSiteSettings } from "@/lib/admin/actions";
import { getStaffProfile } from "@/lib/admin/auth";
import type { SiteSettingsRow } from "@/lib/admin/types";
import {
  Button,
  Card,
  Field,
  Input,
  PageHeader,
  Textarea,
} from "@/components/admin/ui";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MS_TABLES } from "@/lib/supabase/tables";

async function saveAction(formData: FormData) {
  "use server";
  await saveSiteSettings(formData);
  redirect("/admin/settings");
}

export default async function SettingsPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const profile = await getStaffProfile();
  if (!profile || profile.role !== "administrator") {
    redirect("/admin");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(MS_TABLES.siteSettings)
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const settings = (data as SiteSettingsRow | null) ?? null;
  const social = settings?.social_links ?? {};

  return (
    <div>
      <PageHeader
        title="Site settings"
        description="Office details, branding, and social links."
      />
      <Card>
        <form action={saveAction} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Office Name">
              <Input
                name="office_name"
                defaultValue={settings?.office_name ?? ""}
              />
            </Field>
            <Field label="Phone">
              <Input name="phone" defaultValue={settings?.phone ?? ""} />
            </Field>
            <Field label="Email">
              <Input
                name="email"
                type="email"
                defaultValue={settings?.email ?? ""}
              />
            </Field>
            <Field label="Business Hours">
              <Input
                name="business_hours"
                defaultValue={settings?.business_hours ?? ""}
              />
            </Field>
          </div>

          <Field label="Address">
            <Textarea
              name="address"
              rows={3}
              defaultValue={settings?.address ?? ""}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Logo URL">
              <Input name="logo_url" defaultValue={settings?.logo_url ?? ""} />
            </Field>
            <Field label="Favicon URL">
              <Input
                name="favicon_url"
                defaultValue={settings?.favicon_url ?? ""}
              />
            </Field>
          </div>

          <Field label="Footer Text">
            <Textarea
              name="footer_text"
              rows={3}
              defaultValue={settings?.footer_text ?? ""}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="LinkedIn">
              <Input
                name="linkedin"
                defaultValue={social.linkedin ?? ""}
              />
            </Field>
            <Field label="Facebook">
              <Input
                name="facebook"
                defaultValue={social.facebook ?? ""}
              />
            </Field>
            <Field label="Twitter / X">
              <Input name="twitter" defaultValue={social.twitter ?? ""} />
            </Field>
            <Field label="Instagram">
              <Input
                name="instagram"
                defaultValue={social.instagram ?? ""}
              />
            </Field>
          </div>

          <Button type="submit">Save settings</Button>
        </form>
      </Card>
    </div>
  );
}
