"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { logActivity } from "@/lib/admin/activity";
import {
  canManageSettings,
  canManageUsers,
  canPublish,
  requireAdministrator,
  requireStaff,
} from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/utils";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import {
  MEDIA_FOLDERS,
  MS_STORAGE_BUCKET,
  MS_TABLES,
  type MediaFolder,
} from "@/lib/supabase/tables";

function revalidatePublic() {
  revalidateTag("ms-public-content", "max");
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/resources/guides");
}

const teamSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().min(1).max(120),
  professional_title: z.string().max(160).default(""),
  short_bio: z.string().max(500).default(""),
  full_bio: z.string().max(8000).default(""),
  photo_url: z.string().url().optional().or(z.literal("")).nullable(),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().optional().or(z.literal("")).nullable(),
  office_location: z.string().max(120).optional().nullable(),
  years_experience: z.coerce.number().int().min(0).max(80).optional().nullable(),
  credentials: z.string().max(200).default(""),
  areas_of_focus: z.string().max(1000).default(""),
  display_order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
});

export async function saveTeamMember(formData: FormData) {
  const actor = await requireStaff();
  const parsed = teamSchema.parse({
    id: formData.get("id") || undefined,
    full_name: formData.get("full_name"),
    professional_title: formData.get("professional_title") ?? "",
    short_bio: formData.get("short_bio") ?? "",
    full_bio: formData.get("full_bio") ?? "",
    photo_url: formData.get("photo_url") || null,
    phone: formData.get("phone") || null,
    email: formData.get("email") || null,
    office_location: formData.get("office_location") || null,
    years_experience: formData.get("years_experience") || null,
    credentials: formData.get("credentials") ?? "",
    areas_of_focus: formData.get("areas_of_focus") ?? "",
    display_order: formData.get("display_order") ?? 0,
    active: formData.get("active") === "on" || formData.get("active") === "true",
    featured:
      formData.get("featured") === "on" || formData.get("featured") === "true",
  });

  const areas = parsed.areas_of_focus
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    full_name: parsed.full_name,
    professional_title: parsed.professional_title,
    short_bio: parsed.short_bio,
    full_bio: parsed.full_bio,
    photo_url: parsed.photo_url || null,
    phone: parsed.phone || null,
    email: parsed.email || null,
    office_location: parsed.office_location || null,
    years_experience: parsed.years_experience ?? null,
    credentials: parsed.credentials,
    areas_of_focus: areas,
    display_order: parsed.display_order,
    active: parsed.active,
    featured: parsed.featured,
    slug: slugify(parsed.full_name),
    updated_by: actor.id,
  };

  const supabase = await createClient();
  let id = parsed.id;

  if (id) {
    const { error } = await supabase
      .from(MS_TABLES.teamMembers)
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from(MS_TABLES.teamMembers)
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }

  await logActivity({
    actor,
    action: parsed.id ? "update" : "create",
    entityType: "team_member",
    entityId: id,
    summary: `${parsed.id ? "Updated" : "Added"} team member ${parsed.full_name}`,
  });

  revalidatePublic();
  return { id };
}

export async function archiveTeamMember(id: string) {
  const actor = await requireStaff();
  const supabase = await createClient();
  const { error } = await supabase
    .from(MS_TABLES.teamMembers)
    .update({ active: false, updated_by: actor.id })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await logActivity({
    actor,
    action: "archive",
    entityType: "team_member",
    entityId: id,
    summary: "Archived team member",
  });
  revalidatePublic();
}

export async function reorderTeamMembers(orderedIds: string[]) {
  const actor = await requireStaff();
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from(MS_TABLES.teamMembers)
        .update({ display_order: index, updated_by: actor.id })
        .eq("id", id),
    ),
  );
  await logActivity({
    actor,
    action: "reorder",
    entityType: "team_member",
    summary: `Reordered ${orderedIds.length} team members`,
  });
  revalidatePublic();
}

const articleSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  summary: z.string().max(1000).default(""),
  category: z.string().max(80).default("General"),
  featured_image_url: z.string().optional().nullable(),
  document_url: z.string().optional().nullable(),
  document_filename: z.string().optional().nullable(),
  document_mime: z.string().optional().nullable(),
  publish_date: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]),
});

export async function saveArticle(formData: FormData) {
  const actor = await requireStaff();
  let status = String(formData.get("status") || "draft") as
    | "draft"
    | "published"
    | "archived";

  if (status === "published" && !canPublish(actor)) {
    status = "draft";
  }

  const parsed = articleSchema.parse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    summary: formData.get("summary") ?? "",
    category: formData.get("category") ?? "General",
    featured_image_url: formData.get("featured_image_url") || null,
    document_url: formData.get("document_url") || null,
    document_filename: formData.get("document_filename") || null,
    document_mime: formData.get("document_mime") || null,
    publish_date: formData.get("publish_date") || null,
    status,
  });

  const payload = {
    title: parsed.title,
    summary: parsed.summary,
    category: parsed.category,
    featured_image_url: parsed.featured_image_url || null,
    document_url: parsed.document_url || null,
    document_filename: parsed.document_filename || null,
    document_mime: parsed.document_mime || null,
    publish_date: parsed.publish_date || null,
    status: parsed.status,
    slug: slugify(parsed.title),
    updated_by: actor.id,
  };

  const supabase = await createClient();
  let id = parsed.id;

  if (id) {
    const { error } = await supabase
      .from(MS_TABLES.articles)
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from(MS_TABLES.articles)
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }

  await logActivity({
    actor,
    action: parsed.status === "published" ? "publish" : parsed.id ? "update" : "create",
    entityType: "article",
    entityId: id,
    summary: `${parsed.status === "published" ? "Published" : parsed.id ? "Updated" : "Created"} article ${parsed.title}`,
  });

  revalidatePublic();
  return { id, status: parsed.status };
}

export async function deleteArticle(id: string) {
  const actor = await requireStaff();
  const supabase = await createClient();
  const { error } = await supabase.from(MS_TABLES.articles).delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logActivity({
    actor,
    action: "delete",
    entityType: "article",
    entityId: id,
    summary: "Deleted article",
  });
  revalidatePublic();
}

export async function savePageContent(formData: FormData) {
  const actor = await requireStaff();
  const pageKey = String(formData.get("page_key") || "");
  const title = String(formData.get("title") || "");
  const contentRaw = String(formData.get("content") || "{}");
  let status = String(formData.get("status") || "draft") as "draft" | "published";

  if (status === "published" && !canPublish(actor)) {
    status = "draft";
  }

  let content: Record<string, unknown>;
  try {
    content = JSON.parse(contentRaw) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid page content JSON");
  }

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from(MS_TABLES.pageContent)
    .select("id")
    .eq("page_key", pageKey)
    .maybeSingle();

  const payload = {
    page_key: pageKey,
    title,
    content,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_by: actor.id,
  };

  if (existing?.id) {
    const { error } = await supabase
      .from(MS_TABLES.pageContent)
      .update(payload)
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from(MS_TABLES.pageContent).insert(payload);
    if (error) throw new Error(error.message);
  }

  await logActivity({
    actor,
    action: status === "published" ? "publish" : "update",
    entityType: "page_content",
    entityId: pageKey,
    summary: `${status === "published" ? "Published" : "Saved"} page ${title || pageKey}`,
  });

  revalidatePublic();
}

export async function saveSiteSettings(formData: FormData) {
  const actor = await requireAdministrator();
  if (!canManageSettings(actor)) throw new Error("Forbidden");

  const social = {
    linkedin: String(formData.get("linkedin") || ""),
    facebook: String(formData.get("facebook") || ""),
    twitter: String(formData.get("twitter") || ""),
    instagram: String(formData.get("instagram") || ""),
  };

  const payload = {
    office_name: String(formData.get("office_name") || ""),
    address: String(formData.get("address") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    business_hours: String(formData.get("business_hours") || ""),
    social_links: social,
    logo_url: String(formData.get("logo_url") || "") || null,
    favicon_url: String(formData.get("favicon_url") || "") || null,
    footer_text: String(formData.get("footer_text") || ""),
    updated_by: actor.id,
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from(MS_TABLES.siteSettings)
    .upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  await logActivity({
    actor,
    action: "update",
    entityType: "site_settings",
    entityId: "1",
    summary: "Updated site settings",
  });
  revalidatePublic();
}

export async function uploadMediaAsset(formData: FormData) {
  const actor = await requireStaff();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "pages") as MediaFolder;
  const altText = String(formData.get("alt_text") || "");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("File is required");
  }
  if (!MEDIA_FOLDERS.includes(folder)) {
    throw new Error("Invalid folder");
  }
  if (file.size > 20 * 1024 * 1024) {
    throw new Error("File must be under 20MB");
  }

  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : "";
  const path = `${folder}/${crypto.randomUUID()}${ext}`;

  const supabase = await createClient();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(MS_STORAGE_BUCKET)
    .upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from(MS_STORAGE_BUCKET).getPublicUrl(path);

  const { data, error } = await supabase
    .from(MS_TABLES.mediaAssets)
    .insert({
      filename: file.name,
      storage_path: path,
      public_url: publicUrl,
      folder,
      mime_type: file.type || "application/octet-stream",
      size_bytes: file.size,
      alt_text: altText,
      created_by: actor.id,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await logActivity({
    actor,
    action: "upload",
    entityType: "media",
    entityId: data.id,
    summary: `Uploaded ${file.name} to ${folder}/`,
  });

  revalidatePublic();
  return data;
}

export async function updateMediaAlt(id: string, altText: string) {
  const actor = await requireStaff();
  const supabase = await createClient();
  const { error } = await supabase
    .from(MS_TABLES.mediaAssets)
    .update({ alt_text: altText })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await logActivity({
    actor,
    action: "update",
    entityType: "media",
    entityId: id,
    summary: "Updated media alt text",
  });
}

export async function deleteMediaAsset(id: string) {
  const actor = await requireStaff();
  const supabase = await createClient();
  const { data: asset, error: fetchError } = await supabase
    .from(MS_TABLES.mediaAssets)
    .select("*")
    .eq("id", id)
    .single();
  if (fetchError) throw new Error(fetchError.message);

  await supabase.storage.from(MS_STORAGE_BUCKET).remove([asset.storage_path]);
  const { error } = await supabase.from(MS_TABLES.mediaAssets).delete().eq("id", id);
  if (error) throw new Error(error.message);

  await logActivity({
    actor,
    action: "delete",
    entityType: "media",
    entityId: id,
    summary: `Deleted media ${asset.filename}`,
  });
  revalidatePublic();
}

export async function inviteUser(formData: FormData) {
  const actor = await requireAdministrator();
  if (!canManageUsers(actor)) throw new Error("Forbidden");

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const fullName = String(formData.get("full_name") || "").trim();
  const role = String(formData.get("role") || "editor");

  if (!email || !fullName) throw new Error("Name and email are required");
  if (role !== "administrator" && role !== "editor") {
    throw new Error("Invalid role");
  }

  const service = createServiceClient();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/admin`,
    data: {
      full_name: fullName,
      ms_role: role,
      ms_active: "true",
    },
  });
  if (error) throw new Error(error.message);

  const userId = data.user?.id;
  if (!userId) throw new Error("Invite failed");

  const { error: profileError } = await service.from(MS_TABLES.profiles).upsert({
    id: userId,
    email,
    full_name: fullName,
    role,
    active: true,
  });
  if (profileError) throw new Error(profileError.message);

  await logActivity({
    actor,
    action: "invite",
    entityType: "user",
    entityId: userId,
    summary: `Invited ${email} as ${role}`,
  });
}

export async function setUserActive(userId: string, active: boolean) {
  const actor = await requireAdministrator();
  const supabase = await createClient();
  const { error } = await supabase
    .from(MS_TABLES.profiles)
    .update({ active })
    .eq("id", userId);
  if (error) throw new Error(error.message);
  await logActivity({
    actor,
    action: active ? "activate" : "deactivate",
    entityType: "user",
    entityId: userId,
    summary: `${active ? "Activated" : "Deactivated"} user`,
  });
}
