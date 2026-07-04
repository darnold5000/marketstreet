import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import {
  Section,
  SectionHeader,
  Breadcrumbs,
  FAQAccordion,
  CTABanner,
  Button,
} from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { services, getService } from "@/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(service.title, service.description, `/services/${slug}`),
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services/wealth-management" },
            { name: service.title, url: `/services/${slug}` },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services/wealth-management" },
            { label: service.title },
          ]}
        />
        <SectionHeader
          eyebrow="Our Services"
          title={service.title}
          description={service.description}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl text-navy">What We Offer</h3>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-muted">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/schedule" variant="primary" trackEvent="service_schedule">
                Schedule Consultation
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-navy">
              Frequently Asked Questions
            </h3>
            <div className="mt-6">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </div>
      </Section>

      <CTABanner
        title="Let's start the conversation"
        description="Schedule a complimentary, no-obligation meeting to learn how Market Street can help with your financial goals."
      />
    </>
  );
}
