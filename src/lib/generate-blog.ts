export interface GeneratedBlogPost {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

function extractTitle(draft: string): string {
  const firstLine = draft.split("\n").find((l) => l.trim().length > 10);
  return firstLine?.trim().slice(0, 80) ?? "Untitled Article";
}

function generateFAQs(draft: string): { question: string; answer: string }[] {
  const sentences = draft.split(/[.!?]+/).filter((s) => s.trim().length > 40);
  if (sentences.length < 2) {
    return [
      {
        question: "Who wrote this article?",
        answer: "This article was written by the advisors at Market Street Wealth Management, a fee-only fiduciary firm serving Indiana and clients nationwide.",
      },
    ];
  }
  return [
    {
      question: "What is the main takeaway from this article?",
      answer: sentences[0].trim() + ".",
    },
    {
      question: "Should I consult a financial advisor about this topic?",
      answer:
        "Every financial situation is unique. We recommend scheduling a complimentary consultation with a Market Street advisor to discuss how this applies to your specific circumstances.",
    },
  ];
}

function formatContent(draft: string): string {
  const paragraphs = draft
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length <= 3) {
    return paragraphs.join("\n\n");
  }

  const mid = Math.floor(paragraphs.length / 2);
  const formatted: string[] = [];

  paragraphs.forEach((p, i) => {
    if (i === mid) {
      formatted.push("## Key Insights");
    }
    formatted.push(p);
  });

  return formatted.join("\n\n");
}

function buildSchema(post: Omit<GeneratedBlogPost, "schema">): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "Market Street Wealth Management Advisors, LLC",
    },
  };
}

export async function generateBlogPost(
  draft: string,
  author = "Market Street Wealth Management"
): Promise<GeneratedBlogPost> {
  const openaiKey = process.env.OPENAI_API_KEY;

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an SEO editor for Market Street Wealth Management, a fee-only fiduciary financial advisory firm in Indiana. 
Return JSON with: title, seoTitle, metaDescription (max 160 chars), excerpt (max 300 chars), content (markdown with ## headings, 300-800 words, improved from draft), faqs (array of 2-3 {question, answer}).
Keep the advisor's authentic voice. Do not invent facts not in the draft.`,
            },
            { role: "user", content: draft },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        const title = parsed.title ?? extractTitle(draft);
        const content = parsed.content ?? formatContent(draft);
        const post = {
          slug: slugify(title),
          title,
          seoTitle: parsed.seoTitle ?? `${title} | Market Street Wealth Management`,
          metaDescription: parsed.metaDescription ?? content.slice(0, 160),
          excerpt: parsed.excerpt ?? content.slice(0, 300),
          author,
          publishedAt: new Date().toISOString().slice(0, 10),
          category: "Financial Planning",
          readTime: estimateReadTime(content),
          content,
          faqs: parsed.faqs ?? generateFAQs(draft),
        };
        return { ...post, schema: buildSchema(post) };
      }
    } catch {
      // fall through to rule-based generation
    }
  }

  const title = extractTitle(draft);
  const content = formatContent(draft);
  const post = {
    slug: slugify(title),
    title,
    seoTitle: `${title} | Market Street Wealth Management`,
    metaDescription: content.replace(/##.*\n/g, "").slice(0, 157) + "...",
    excerpt: content.replace(/##.*\n/g, "").slice(0, 297) + "...",
    author,
    publishedAt: new Date().toISOString().slice(0, 10),
    category: "Financial Planning",
    readTime: estimateReadTime(content),
    content,
    faqs: generateFAQs(draft),
  };

  return { ...post, schema: buildSchema(post) };
}
