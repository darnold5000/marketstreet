import Image from "next/image";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import {
  Section,
  Breadcrumbs,
  FAQAccordion,
  Button,
} from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import { Icon, IconCircle, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { services, getService } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/content/site";

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

function getRelatedPosts(slug: string) {
  const keywords: Record<string, string[]> = {
    "wealth-management": ["wealth", "financial", "planning"],
    "retirement-planning": ["retirement", "social security"],
    "business-retirement-plans": ["business", "retirement"],
    foundations: ["young", "financial literacy", "teens"],
    "investment-management": ["review", "tax", "financial"],
  };
  const terms = keywords[slug] ?? ["financial"];
  return blogPosts
    .filter((p) =>
      terms.some(
        (t) =>
          p.title.toLowerCase().includes(t) ||
          p.excerpt.toLowerCase().includes(t)
      )
    )
    .slice(0, 3);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedPosts = getRelatedPosts(slug);
  const processSteps = siteConfig.process;

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

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-28 pb-20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-office.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { label: "Services", href: "/services/wealth-management" },
              { label: service.title },
            ]}
          />
          <div className="mt-6 flex items-start gap-5">
            <IconCircle
              name={service.icon as IconName}
              className="bg-white/10 text-gold h-14 w-14"
            />
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl text-white md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-white/75">{service.shortDescription}</p>
              <div className="mt-8">
                <Button href="/schedule" variant="secondary" trackEvent="service_schedule">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <Section className="py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">What it is</p>
          <h2 className="mt-4 font-display text-3xl text-navy md:text-4xl">{service.whatItIs}</h2>
        </div>
      </Section>

      {/* Who it's for */}
      <Section background="cream" className="py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Who it&apos;s for</p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">Is this right for you?</h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {service.whoItsFor.map((item, i) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-6 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm font-medium text-navy">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Benefits</p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">What you get</h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4">
          {service.benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 rounded-xl border border-border px-6 py-4"
            >
              <IconCircle name="check" className="h-9 w-9 bg-gold/10" />
              <p className="text-navy">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section background="cream" className="py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Process</p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">How we work together</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
                {step.step}
              </div>
              <h3 className="mt-4 font-display text-lg text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section className="py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">FAQ</p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">Common questions</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <FAQAccordion faqs={service.faqs} />
        </div>
      </Section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <Section background="cream" className="py-20">
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">Related</p>
            <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">Further reading</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Let&apos;s talk about your goals
          </h2>
          <p className="mt-4 text-white/70">
            Schedule a complimentary consultation — no pressure, no obligation.
          </p>
          <div className="mt-8">
            <Button href="/schedule" variant="secondary" trackEvent="service_cta">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
