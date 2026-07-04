import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { siteConfig } from "@/content/site";

export const metadata = createMetadata({
  title: "Disclosures",
  description: `Important disclosures and regulatory information for ${siteConfig.legalName}.`,
  path: "/disclosures",
});

export default function DisclosuresPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema("Disclosures", "Market Street Wealth Management Disclosures", "/disclosures"),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Disclosures", url: "/disclosures" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Disclosures" }]} />
        <article className="prose-content mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl text-navy">Disclosures</h1>

          <h2>Advisory Services</h2>
          <p>
            {siteConfig.legalName} is a registered investment adviser. Registration
            does not imply a certain level of skill or training. Advisory services
            are provided pursuant to a written agreement and Form ADV Part 2A
            disclosure brochure.
          </p>

          <h2>Fee-Only Compensation</h2>
          <p>
            Market Street is compensated exclusively by client fees. Our advisors do
            not receive commissions, referral fees, or compensation from any
            financial institutions or third parties for recommending specific
            products or services.
          </p>

          <h2>Fiduciary Standard</h2>
          <p>
            As a registered investment adviser, Market Street is held to a fiduciary
            standard, meaning we are legally obligated to act in our clients&apos;
            best interests at all times.
          </p>

          <h2>Investment Risks</h2>
          <p>
            All investments involve risk, including the potential loss of principal.
            Past performance is not indicative of future results. No investment
            strategy can guarantee a profit or protect against loss.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the content or privacy practices of these external sites.
          </p>

          <h2>Form ADV</h2>
          <p>
            A copy of our Form ADV Part 2A disclosure brochure is available upon
            request or through the SEC&apos;s Investment Adviser Public Disclosure
            website at{" "}
            <a
              href="https://adviserinfo.sec.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy underline hover:text-gold"
            >
              adviserinfo.sec.gov
            </a>
            .
          </p>

          <h2>Contact</h2>
          <p>
            For questions regarding these disclosures, please contact us at{" "}
            {siteConfig.email} or visit our{" "}
            <a href="/contact" className="text-navy underline hover:text-gold">
              contact page
            </a>
            .
          </p>
        </article>
      </Section>
    </>
  );
}
