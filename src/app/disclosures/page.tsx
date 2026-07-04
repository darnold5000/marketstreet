import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { disclosureSections } from "@/content/disclosures";
import {
  AdditionalDocuments,
  DisclosureAccordion,
} from "@/components/disclosures/DisclosureContent";

export const metadata = createMetadata({
  title: "Important Disclosures",
  description:
    "Review important regulatory disclosures, investment advisory information, and legal notices for Market Street Wealth Management Advisors.",
  path: "/disclosures",
});

export default function DisclosuresPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Important Disclosure Information",
            "Regulatory disclosures and legal notices for Market Street Wealth Management Advisors, LLC",
            "/disclosures"
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Disclosures", url: "/disclosures" },
          ]),
        ]}
      />

      <section className="bg-navy pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs light items={[{ label: "Disclosures" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">
              Regulatory Information
            </p>
            <h1 className="mt-4 font-display text-4xl text-white md:text-5xl lg:text-6xl">
              Important Disclosure Information
            </h1>
            <p className="mt-6 text-lg text-white/80 md:text-xl">
              Transparency and regulatory information regarding Market Street Wealth
              Management Advisors, LLC.
            </p>
          </div>
        </div>
      </section>

      <Section className="py-20 md:py-24">
        <DisclosureAccordion sections={disclosureSections} />
      </Section>

      <Section background="cream" className="py-20 md:py-24">
        <AdditionalDocuments />
        <p className="mx-auto mt-10 max-w-4xl text-center text-sm text-muted">
          Questions about these disclosures?{" "}
          <Link href="/contact" className="font-medium text-navy hover:text-gold">
            Contact us
          </Link>{" "}
          or visit{" "}
          <a
            href="https://adviserinfo.sec.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-navy hover:text-gold"
          >
            adviserinfo.sec.gov
          </a>
          .
        </p>
      </Section>
    </>
  );
}
