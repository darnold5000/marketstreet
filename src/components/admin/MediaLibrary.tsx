"use client";

import { FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  deleteMediaAsset,
  updateMediaAlt,
  uploadMediaAsset,
} from "@/lib/admin/actions";
import type { MediaAssetRow } from "@/lib/admin/types";
import { formatDate, formatDateTime } from "@/lib/admin/utils";
import { MEDIA_FOLDERS } from "@/lib/supabase/tables";
import {
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Select,
} from "@/components/admin/ui";

function isImage(mime: string) {
  return mime.startsWith("image/");
}

export function MediaLibrary({
  assets,
  initialQuery = "",
}: {
  assets: MediaAssetRow[];
  initialQuery?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [altDrafts, setAltDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(assets.map((a) => [a.id, a.alt_text ?? ""])),
  );

  function onUpload(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await uploadMediaAsset(formData);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/admin/media${params.toString() ? `?${params}` : ""}`);
  }

  function onSaveAlt(id: string) {
    setError(null);
    startTransition(async () => {
      try {
        await updateMediaAlt(id, altDrafts[id] ?? "");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update alt text");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Delete this media asset?")) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteMediaAsset(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Upload</h2>
        <form action={onUpload} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Folder">
            <Select name="folder" defaultValue="pages">
              {MEDIA_FOLDERS.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="File">
            <Input name="file" type="file" required />
          </Field>
          <Field label="Alt Text">
            <Input name="alt_text" placeholder="Describe the image" />
          </Field>
          <div className="flex items-end">
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending ? "Uploading…" : "Upload"}
            </Button>
          </div>
        </form>
      </Card>

      <form onSubmit={onSearch} className="flex flex-wrap items-end gap-2">
        <div className="min-w-[220px] flex-1">
          <Field label="Search by filename">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="filename…"
            />
          </Field>
        </div>
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {assets.length === 0 ? (
        <EmptyState
          title="No media yet"
          description="Upload images or documents to reuse across team, articles, and pages."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="flex flex-col gap-3 p-4">
              <div className="flex h-36 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                {isImage(asset.mime_type) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.public_url}
                    alt={asset.alt_text || asset.filename}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-500">
                    <FileText className="h-8 w-8" />
                    <span className="text-xs">{asset.mime_type}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="truncate text-sm font-medium text-slate-900">
                  {asset.filename}
                </p>
                <p className="text-xs text-slate-500">
                  {asset.folder} · {formatDate(asset.created_at)}
                </p>
                <a
                  href={asset.public_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block truncate text-xs text-slate-600 underline"
                >
                  {asset.public_url}
                </a>
              </div>
              <Field label="Alt text">
                <Input
                  value={altDrafts[asset.id] ?? ""}
                  onChange={(e) =>
                    setAltDrafts((prev) => ({
                      ...prev,
                      [asset.id]: e.target.value,
                    }))
                  }
                />
              </Field>
              <div className="mt-auto flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={pending}
                  onClick={() => onSaveAlt(asset.id)}
                >
                  Save alt
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={pending}
                  onClick={() => onDelete(asset.id)}
                  aria-label={`Delete ${asset.filename}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-400">
                Updated {formatDateTime(asset.created_at)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
