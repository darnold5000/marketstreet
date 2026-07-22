"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  archiveTeamMember,
  saveTeamMember,
} from "@/lib/admin/actions";
import type { TeamMemberRow } from "@/lib/admin/types";
import { Button, Field, Input, Textarea } from "@/components/admin/ui";

export function TeamForm({
  member,
}: {
  member?: TeamMemberRow | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [photoUrl, setPhotoUrl] = useState(member?.photo_url ?? "");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const { id } = await saveTeamMember(formData);
        router.push(`/admin/team/${id}`);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  function onArchive() {
    if (!member?.id) return;
    if (!confirm("Archive this team member?")) return;
    setError(null);
    startTransition(async () => {
      try {
        await archiveTeamMember(member.id);
        router.push("/admin/team");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to archive");
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-5">
      {member?.id ? <input type="hidden" name="id" value={member.id} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <Input
            name="full_name"
            required
            defaultValue={member?.full_name ?? ""}
          />
        </Field>
        <Field label="Professional Title">
          <Input
            name="professional_title"
            defaultValue={member?.professional_title ?? ""}
          />
        </Field>
      </div>

      <Field label="Short Bio">
        <Textarea
          name="short_bio"
          rows={3}
          defaultValue={member?.short_bio ?? ""}
        />
      </Field>

      <Field label="Full Bio">
        <Textarea
          name="full_bio"
          rows={8}
          defaultValue={member?.full_bio ?? ""}
        />
      </Field>

      <Field label="Profile Photo URL" hint="Paste a URL from the Media library">
        <Input
          name="photo_url"
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="https://..."
        />
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt="Profile preview"
            className="mt-3 h-24 w-24 rounded-md border border-slate-200 object-cover"
          />
        ) : null}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <Input name="phone" defaultValue={member?.phone ?? ""} />
        </Field>
        <Field label="Email">
          <Input
            name="email"
            type="email"
            defaultValue={member?.email ?? ""}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Office Location">
          <Input
            name="office_location"
            defaultValue={member?.office_location ?? ""}
          />
        </Field>
        <Field label="Years of Experience">
          <Input
            name="years_experience"
            type="number"
            min={0}
            max={80}
            defaultValue={member?.years_experience ?? ""}
          />
        </Field>
      </div>

      <Field label="Credentials">
        <Input name="credentials" defaultValue={member?.credentials ?? ""} />
      </Field>

      <Field
        label="Areas of Focus"
        hint="Comma-separated, e.g. Retirement, Estate planning"
      >
        <Input
          name="areas_of_focus"
          defaultValue={(member?.areas_of_focus ?? []).join(", ")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Display Order">
          <Input
            name="display_order"
            type="number"
            defaultValue={member?.display_order ?? 0}
          />
        </Field>
        <Field label="Active">
          <label className="flex items-center gap-2 pt-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="active"
              defaultChecked={member?.active ?? true}
              className="rounded border-slate-300"
            />
            Show on website
          </label>
        </Field>
        <Field label="Featured">
          <label className="flex items-center gap-2 pt-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={member?.featured ?? false}
              className="rounded border-slate-300"
            />
            Feature on homepage
          </label>
        </Field>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save team member"}
        </Button>
        {member?.id ? (
          <Button
            type="button"
            variant="danger"
            disabled={pending}
            onClick={onArchive}
          >
            Archive
          </Button>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          disabled={pending}
          onClick={() => router.push("/admin/team")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
