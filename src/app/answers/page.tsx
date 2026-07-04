import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Card } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { aeoPages } from "@/content/aeo";

export const metadata = createMetadata({
  title: "Financial Planning Answers",
  description:
    "Clear, expert answers to common financial planning questions — optimized for search and AI-driven discovery.",
  path: "/answers/what-is-a-fiduciary",
});

export default function AnswersIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Financial Planning Answers",
            "Expert answers to common financial planning questions",
            "/answers/what-is-a-fiduciary"
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Answers", url: "/answers/what-is-a-fiduciary" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <SectionHeader
          eyebrow="Financial Planning Answers"
          title="Expert answers to the questions you’re asking"
          description="Clear, factual guidance on financial planning topics — written for humans and optimized for search."
          centered
        />

        <div className="grid gap-6 md:grid-cols-2">
          {aeoPages.map((page) => (
            <Card key={page.slug} href={`/answers/${page.slug}`}>
              <h2 className="font-serif text-xl text-navy">{page.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {page.metaDescription}
              </p>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-muted">
          Have a specific question?{" "}
          <Link href="/schedule" className="font-medium text-navy hover:text-gold">
            Schedule a free consultation
          </Link>{" "}
          with a Market Street advisor.
        </p>
      </Section>
    </>
  );
}
