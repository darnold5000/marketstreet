import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs } from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { blogPosts } from "@/content/blog";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Financial planning insights, retirement strategies, and wealth management guidance from the advisors at Market Street Wealth Management.",
  path: "/resources/blog",
});

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <JsonLd
        data={[
          webPageSchema("Blog", "Financial planning insights from Market Street", "/resources/blog"),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources/blog" },
            { name: "Blog", url: "/resources/blog" },
          ]),
        ]}
      />

      <Section className="pt-16 pb-8">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources/blog" },
            { label: "Blog" },
          ]}
        />
        <div className="mt-8 max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Insights</p>
          <h1 className="mt-3 font-display text-4xl text-navy md:text-5xl">From our advisors</h1>
          <p className="mt-4 text-lg text-muted">
            Expert guidance on planning, retirement, and building wealth.
          </p>
        </div>
      </Section>

      <Section className="pt-0 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
