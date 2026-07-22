"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { savePageContent } from "@/lib/admin/actions";
import type { HomepageContent, PageContentRow } from "@/lib/admin/types";
import type { PageKey } from "@/lib/supabase/tables";
import {
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/admin/ui";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asBool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  return [];
}

export function PageEditor({
  pageKey,
  page,
  canPublish,
}: {
  pageKey: PageKey;
  page?: PageContentRow | null;
  canPublish: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const content = page?.content ?? {};

  const defaults = useMemo(() => {
    if (pageKey === "homepage") {
      return {
        headline: asString(content.headline),
        intro: asString(content.intro),
        cta_primary_label: asString(content.cta_primary_label),
        cta_primary_href: asString(content.cta_primary_href),
        cta_secondary_label: asString(content.cta_secondary_label),
        cta_secondary_href: asString(content.cta_secondary_href),
        hero_image_url: asString(content.hero_image_url),
        featured_advisor_id: asString(content.featured_advisor_id),
        featured_resource_ids: asStringArray(content.featured_resource_ids).join(
          ", ",
        ),
      };
    }
    if (pageKey === "about" || pageKey === "contact") {
      return {
        headline: asString(content.headline),
        intro: asString(content.intro),
        body: asString(content.body),
        form_note: asString(content.form_note),
      };
    }
    if (pageKey === "footer") {
      return {
        footer_text: asString(content.footer_text),
        show_social: asBool(content.show_social, true),
      };
    }
    return {
      offices_json: JSON.stringify(content.offices ?? content, null, 2),
      address: asString(content.address),
      phone: asString(content.phone),
      email: asString(content.email),
      hours: asString(content.hours),
    };
  }, [content, pageKey]);

  const [heroUrl, setHeroUrl] = useState(
    pageKey === "homepage" ? asString(content.hero_image_url) : "",
  );

  function buildContent(formData: FormData): Record<string, unknown> {
    if (pageKey === "homepage") {
      const ids = String(formData.get("featured_resource_ids") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const payload: HomepageContent = {
        headline: String(formData.get("headline") || ""),
        intro: String(formData.get("intro") || ""),
        cta_primary_label: String(formData.get("cta_primary_label") || ""),
        cta_primary_href: String(formData.get("cta_primary_href") || ""),
        cta_secondary_label: String(formData.get("cta_secondary_label") || ""),
        cta_secondary_href: String(formData.get("cta_secondary_href") || ""),
        hero_image_url: String(formData.get("hero_image_url") || ""),
        featured_advisor_id:
          String(formData.get("featured_advisor_id") || "") || null,
        featured_resource_ids: ids,
      };
      return payload;
    }

    if (pageKey === "about" || pageKey === "contact") {
      return {
        headline: String(formData.get("headline") || ""),
        intro: String(formData.get("intro") || ""),
        body: String(formData.get("body") || ""),
        form_note: String(formData.get("form_note") || ""),
      };
    }

    if (pageKey === "footer") {
      return {
        footer_text: String(formData.get("footer_text") || ""),
        show_social:
          formData.get("show_social") === "on" ||
          formData.get("show_social") === "true",
      };
    }

    const officesRaw = String(formData.get("offices_json") || "").trim();
    if (officesRaw) {
      try {
        return JSON.parse(officesRaw) as Record<string, unknown>;
      } catch {
        throw new Error("Offices JSON is invalid");
      }
    }

    return {
      address: String(formData.get("address") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      hours: String(formData.get("hours") || ""),
    };
  }

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const built = buildContent(formData);
        formData.set("content", JSON.stringify(built));
        formData.set("page_key", pageKey);
        await savePageContent(formData);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  const titleDefault =
    page?.title ||
    pageKey.charAt(0).toUpperCase() + pageKey.slice(1).replace(/_/g, " ");

  return (
    <form action={onSubmit} className="space-y-5">
      <input type="hidden" name="page_key" value={pageKey} />

      <Field label="Page Title">
        <Input name="title" required defaultValue={titleDefault} />
      </Field>

      {pageKey === "homepage" ? (
        <>
          <Field label="Headline">
            <Input name="headline" defaultValue={defaults.headline as string} />
          </Field>
          <Field label="Intro">
            <Textarea
              name="intro"
              rows={4}
              defaultValue={defaults.intro as string}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Primary CTA Label">
              <Input
                name="cta_primary_label"
                defaultValue={defaults.cta_primary_label as string}
              />
            </Field>
            <Field label="Primary CTA Href">
              <Input
                name="cta_primary_href"
                defaultValue={defaults.cta_primary_href as string}
              />
            </Field>
            <Field label="Secondary CTA Label">
              <Input
                name="cta_secondary_label"
                defaultValue={defaults.cta_secondary_label as string}
              />
            </Field>
            <Field label="Secondary CTA Href">
              <Input
                name="cta_secondary_href"
                defaultValue={defaults.cta_secondary_href as string}
              />
            </Field>
          </div>
          <Field label="Hero Image URL">
            <Input
              name="hero_image_url"
              value={heroUrl}
              onChange={(e) => setHeroUrl(e.target.value)}
            />
            {heroUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroUrl}
                alt="Hero preview"
                className="mt-3 h-40 w-full max-w-xl rounded-md border border-slate-200 object-cover"
              />
            ) : null}
          </Field>
          <Field label="Featured Advisor ID" hint="Team member UUID">
            <Input
              name="featured_advisor_id"
              defaultValue={defaults.featured_advisor_id as string}
            />
          </Field>
          <Field
            label="Featured Resource IDs"
            hint="Comma-separated article UUIDs"
          >
            <Input
              name="featured_resource_ids"
              defaultValue={defaults.featured_resource_ids as string}
            />
          </Field>
        </>
      ) : null}

      {pageKey === "about" || pageKey === "contact" ? (
        <>
          <Field label="Headline">
            <Input name="headline" defaultValue={defaults.headline as string} />
          </Field>
          <Field label="Intro">
            <Textarea
              name="intro"
              rows={3}
              defaultValue={defaults.intro as string}
            />
          </Field>
          <Field label="Body">
            <Textarea
              name="body"
              rows={8}
              defaultValue={defaults.body as string}
            />
          </Field>
          {pageKey === "contact" ? (
            <Field label="Form Note">
              <Textarea
                name="form_note"
                rows={3}
                defaultValue={defaults.form_note as string}
              />
            </Field>
          ) : (
            <input type="hidden" name="form_note" value="" />
          )}
        </>
      ) : null}

      {pageKey === "footer" ? (
        <>
          <Field label="Footer Text">
            <Textarea
              name="footer_text"
              rows={4}
              defaultValue={defaults.footer_text as string}
            />
          </Field>
          <Field label="Show Social Links">
            <label className="flex items-center gap-2 pt-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="show_social"
                defaultChecked={defaults.show_social as boolean}
                className="rounded border-slate-300"
              />
              Display social icons in footer
            </label>
          </Field>
        </>
      ) : null}

      {pageKey === "office" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Address">
              <Input name="address" defaultValue={defaults.address as string} />
            </Field>
            <Field label="Phone">
              <Input name="phone" defaultValue={defaults.phone as string} />
            </Field>
            <Field label="Email">
              <Input name="email" defaultValue={defaults.email as string} />
            </Field>
            <Field label="Hours">
              <Input name="hours" defaultValue={defaults.hours as string} />
            </Field>
          </div>
          <Field
            label="Offices JSON"
            hint="Optional: paste full offices array/object to override simple fields"
          >
            <Textarea
              name="offices_json"
              rows={10}
              defaultValue={defaults.offices_json as string}
              className="font-mono text-xs"
            />
          </Field>
        </>
      ) : null}

      <Field label="Status">
        <Select
          name="status"
          defaultValue={page?.status ?? "draft"}
          disabled={!canPublish && page?.status === "published"}
        >
          <option value="draft">Draft</option>
          {canPublish ? <option value="published">Published</option> : null}
        </Select>
      </Field>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save page"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={pending}
          onClick={() => router.push("/admin/pages")}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
