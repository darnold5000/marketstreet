import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Card, Breadcrumbs } from "@/components/ui";
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

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources/blog" },
            { label: "Blog" },
          ]}
        />
        <SectionHeader
          eyebrow="Resources"
          title="Insights from our advisors"
          description="Expert guidance on financial planning, retirement, and building wealth — written by the professionals who live it every day."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <Card key={post.slug} href={`/resources/blog/${post.slug}`}>
              <p className="text-xs font-semibold tracking-wider text-gold uppercase">
                {post.category}
              </p>
              <h2 className="mt-2 font-serif text-xl text-navy">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
