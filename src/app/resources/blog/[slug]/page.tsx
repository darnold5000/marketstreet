import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs, FAQAccordion, CTABanner } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  blogPostingSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { blogPosts, getBlogPost } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: `/resources/blog/${slug}`,
  });
}

function renderContent(content: string) {
  return content
    .split("\n\n")
    .map((block, index) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="font-serif text-2xl text-navy mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").map((line) => line.replace(/^- /, ""));
        return (
          <ul key={index} className="list-disc pl-6 mb-6 space-y-2 text-muted">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="mb-6 leading-relaxed text-muted">
          {block}
        </p>
      );
    });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(post.title, post.metaDescription, `/resources/blog/${slug}`),
          blogPostingSchema(post),
          ...(post.faqs ? [faqSchema(post.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/resources/blog" },
            { name: post.title, url: `/resources/blog/${slug}` },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/resources/blog" },
            { label: post.title },
          ]}
        />

        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            {post.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-navy md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="prose-content mt-10">{renderContent(post.content)}</div>

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl text-navy mb-6">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={post.faqs} />
            </div>
          )}
        </article>
      </Section>

      <CTABanner
        title="Have questions about your financial plan?"
        description="Schedule a complimentary consultation with a NorthBridge advisor."
      />
    </>
  );
}
