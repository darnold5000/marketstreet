import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { siteConfig } from "@/content/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.legalName}. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema("Privacy Policy", "NorthBridge Privacy Policy", "/privacy"),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Privacy Policy", url: "/privacy" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <article className="prose-content mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl text-navy">Privacy Policy</h1>
          <p className="mt-6 text-muted">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h2>Introduction</h2>
          <p>
            {siteConfig.legalName} (&quot;NorthBridge,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when
            you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Financial information provided during advisory relationships</li>
            <li>Website usage data through analytics tools</li>
            <li>Information submitted through contact forms</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide financial planning and advisory services</li>
            <li>Respond to inquiries and schedule consultations</li>
            <li>Improve our website and services</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with
            service providers who assist in operating our business, custodians, and
            regulatory bodies as required by law.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your personal information against unauthorized access, alteration,
            disclosure, or destruction.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal
            information by contacting us at {siteConfig.email}.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
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
