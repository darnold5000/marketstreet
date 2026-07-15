import { notFound } from "next/navigation";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs, FAQAccordion, CTABanner } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { aeoPages, getAEOPage } from "@/content/aeo";

export function generateStaticParams() {
  return aeoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getAEOPage(slug);
  if (!page) return {};

  return createMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/answers/${slug}`,
  });
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getAEOPage(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(page.title, page.metaDescription, `/answers/${slug}`),
          faqSchema(page.faqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Answers", url: "/answers/what-is-a-fiduciary" },
            { name: page.title, url: `/answers/${slug}` },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Answers", href: "/answers/what-is-a-fiduciary" },
            { label: page.title },
          ]}
        />

        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            Financial Planning Answers
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-navy md:text-5xl">
            {page.question}
          </h1>

          <div className="prose-content mt-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-serif text-2xl text-navy mb-6">
              Related Questions
            </h2>
            <FAQAccordion faqs={page.faqs} />
          </div>

          {page.relatedServices.length > 0 && (
            <div className="mt-12 rounded-2xl border border-border bg-cream p-8">
              <h3 className="font-serif text-xl text-navy">Related Services</h3>
              <ul className="mt-4 space-y-2">
                {page.relatedServices.map((serviceSlug) => (
                  <li key={serviceSlug}>
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="text-sm font-medium text-navy hover:text-gold capitalize"
                    >
                      {serviceSlug.replace(/-/g, " ")} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Section>

      <CTABanner
        title="Want personalized answers for your situation?"
        description="Schedule a complimentary consultation with a NorthBridge advisor."
      />
    </>
  );
}
