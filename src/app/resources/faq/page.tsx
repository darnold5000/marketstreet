import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, FAQAccordion, Breadcrumbs, CTABanner } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { faqItems, getFAQsByCategory } from "@/content/faq";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about fee-only financial planning, fiduciary advisors, NorthBridge services, and how to get started.",
  path: "/resources/faq",
});

export default function FAQPage() {
  const byCategory = getFAQsByCategory();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema("FAQ", "Frequently asked questions about NorthBridge", "/resources/faq"),
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources/faq" },
            { name: "FAQ", url: "/resources/faq" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources/faq" },
            { label: "FAQ" },
          ]}
        />
        <SectionHeader
          eyebrow="Resources"
          title="Frequently Asked Questions"
          description="Clear answers to the questions we hear most often about financial planning, our services, and how to get started with NorthBridge."
        />

        <div className="space-y-12">
          {Object.entries(byCategory).map(([category, faqs]) => (
            <div key={category}>
              <h2 className="mb-6 font-serif text-2xl text-navy">{category}</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Still have questions?"
        description="Schedule a complimentary consultation and we'll answer everything in a no-pressure conversation."
      />
    </>
  );
}
