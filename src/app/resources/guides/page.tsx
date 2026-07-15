import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Card, Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { services } from "@/content/services";

export const metadata = createMetadata({
  title: "Educational Guides",
  description:
    "Educational guides on wealth management, retirement planning, fee-only financial advice, and building your financial foundation.",
  path: "/resources/guides",
});

const guides = [
  {
    title: "What Is Fee-Only Financial Planning?",
    description:
      "Understand the difference between fee-only and commission-based advisors, and why it matters for your financial future.",
    href: "/resources/blog/understanding-fee-only-financial-planning",
  },
  {
    title: "Pre-Retirement Planning Checklist",
    description:
      "A step-by-step guide covering Social Security, Medicare, portfolio transitions, and income strategies.",
    href: "/resources/blog/retirement-planning-checklist",
  },
  {
    title: "Financial Planning for Young Professionals",
    description:
      "Why starting early matters and how NorthBridge's Foundations program helps build lasting wealth.",
    href: "/resources/blog/foundations-program-young-professionals",
  },
  ...services.map((s) => ({
    title: s.title,
    description: s.shortDescription,
    href: `/services/${s.slug}`,
  })),
];

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Educational Guides",
            "Educational guides from NorthBridge Wealth",
            "/resources/guides"
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources/guides" },
            { name: "Guides", url: "/resources/guides" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources/guides" },
            { label: "Educational Guides" },
          ]}
        />
        <SectionHeader
          eyebrow="Resources"
          title="Educational Guides"
          description="Explore our collection of guides and resources designed to help you make informed financial decisions."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.href} href={guide.href}>
              <h2 className="font-serif text-xl text-navy">{guide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {guide.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold">
                Read guide
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-muted">
          Looking for more? Visit our{" "}
          <Link href="/resources/blog" className="font-medium text-navy hover:text-gold">
            blog
          </Link>{" "}
          or{" "}
          <Link href="/resources/faq" className="font-medium text-navy hover:text-gold">
            FAQ
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
