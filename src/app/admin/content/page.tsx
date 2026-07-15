"use client";

import { useState } from "react";

interface GeneratedPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: string;
  content: string;
  faqs: { question: string; answer: string }[];
  schema: Record<string, unknown>;
}

export default function ContentAssistantPage() {
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("NorthBridge Wealth");
  const [generated, setGenerated] = useState<GeneratedPost | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "publishing" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleGenerate() {
    setStatus("generating");
    setError("");
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(password ? { Authorization: `Bearer ${password}` } : {}),
        },
        body: JSON.stringify({ draft, author }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setGenerated(await res.json());
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setStatus("error");
    }
  }

  async function handlePublish() {
    if (!generated) return;
    setStatus("publishing");
    setError("");
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(password ? { Authorization: `Bearer ${password}` } : {}),
        },
        body: JSON.stringify(generated),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error + (data.hint ? ` — ${data.hint}` : ""));
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-serif text-3xl text-navy">AI Content Assistant</h1>
        <p className="mt-2 text-muted">
          Paste an advisor draft or transcript. AI generates SEO metadata, FAQs, and schema markup.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-navy">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set ADMIN_PASSWORD in .env.local"
              className="w-full rounded-lg border border-border px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="author" className="mb-2 block text-sm font-medium text-navy">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="draft" className="mb-2 block text-sm font-medium text-navy">
              Draft or Transcript
            </label>
            <textarea
              id="draft"
              rows={12}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Paste the advisor's original article, notes, or meeting transcript here..."
              className="w-full rounded-lg border border-border px-4 py-3 text-sm font-mono"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!draft.trim() || status === "generating"}
            className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy-light disabled:opacity-50"
          >
            {status === "generating" ? "Generating..." : "Generate SEO Content"}
          </button>

          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}

          {generated && (
            <div className="rounded-2xl border border-border bg-white p-8">
              <h2 className="font-serif text-2xl text-navy">{generated.title}</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-navy">SEO Title</p>
                  <p className="text-muted">{generated.seoTitle}</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Meta Description</p>
                  <p className="text-muted">{generated.metaDescription}</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Excerpt</p>
                  <p className="text-muted">{generated.excerpt}</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">Content Preview</p>
                  <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-cream p-4 text-xs whitespace-pre-wrap">
                    {generated.content}
                  </pre>
                </div>
                <div>
                  <p className="font-semibold text-navy">FAQ Section ({generated.faqs.length})</p>
                  {generated.faqs.map((faq, i) => (
                    <div key={i} className="mt-2 rounded-lg bg-cream p-3">
                      <p className="font-medium text-navy">{faq.question}</p>
                      <p className="mt-1 text-muted">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handlePublish}
                  disabled={status === "publishing" || status === "done"}
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-white hover:bg-gold-light disabled:opacity-50"
                >
                  {status === "publishing" ? "Publishing..." : status === "done" ? "Published!" : "Publish"}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(generated, null, 2))}
                  className="rounded-full border-2 border-navy px-7 py-3.5 text-sm font-semibold text-navy"
                >
                  Copy JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
