"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { saveArticle } from "@/lib/admin/actions";
import type { ArticleRow } from "@/lib/admin/types";
import {
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/admin/ui";

export function ArticleForm({
  article,
  canPublish,
}: {
  article?: ArticleRow | null;
  canPublish: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(article?.featured_image_url ?? "");
  const [error, setError] = useState<string | null>(null);

  const statusOptions: Array<"draft" | "published" | "archived"> = canPublish
    ? ["draft", "published", "archived"]
    : ["draft", "archived"];

  const defaultStatus =
    article?.status && statusOptions.includes(article.status)
      ? article.status
      : "draft";

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const { id } = await saveArticle(formData);
        router.push(`/admin/articles/${id}`);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-5">
      {article?.id ? <input type="hidden" name="id" value={article.id} /> : null}

      <Field label="Title">
        <Input name="title" required defaultValue={article?.title ?? ""} />
      </Field>

      <Field label="Summary">
        <Textarea
          name="summary"
          rows={3}
          defaultValue={article?.summary ?? ""}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category">
          <Input
            name="category"
            defaultValue={article?.category ?? "General"}
          />
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue={defaultStatus}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Featured Image URL"
        hint="Paste a URL from the Media library"
      >
        <Input
          name="featured_image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Featured preview"
            className="mt-3 h-36 w-full max-w-md rounded-md border border-slate-200 object-cover"
          />
        ) : null}
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Document URL">
          <Input
            name="document_url"
            defaultValue={article?.document_url ?? ""}
            placeholder="https://..."
          />
        </Field>
        <Field label="Document Filename">
          <Input
            name="document_filename"
            defaultValue={article?.document_filename ?? ""}
          />
        </Field>
        <Field label="Document MIME">
          <Input
            name="document_mime"
            defaultValue={article?.document_mime ?? ""}
            placeholder="application/pdf"
          />
        </Field>
      </div>

      <Field label="Publish Date">
        <Input
          name="publish_date"
          type="date"
          defaultValue={
            article?.publish_date
              ? article.publish_date.slice(0, 10)
              : ""
          }
        />
      </Field>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save article"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={pending}
          onClick={() => router.push("/admin/articles")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
