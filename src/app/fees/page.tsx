import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Section, Breadcrumbs, FAQAccordion, Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { wealthManagementFeeTiers, feesFaqs } from "@/content/fees";

export const metadata = createMetadata({
  title: "Our Fees",
  description:
    "Learn how NorthBridge Wealth charges for fee-only fiduciary financial planning and wealth management services, including AUM-based pricing and Foundations fees.",
  path: "/fees",
});

export default function FeesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Our Fees",
            "Transparent fee-only pricing for wealth management and financial planning",
            "/fees"
          ),
          faqSchema(feesFaqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Our Fees", url: "/fees" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-navy pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs light items={[{ label: "Our Fees" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">
              Transparent Pricing
            </p>
            <h1 className="mt-4 font-display text-4xl text-white md:text-5xl lg:text-6xl">
              Our Fees
            </h1>
            <p className="mt-6 text-lg text-white/80 md:text-xl">
              You&apos;re entitled to 100% transparency when choosing a financial advisor.
              When it comes to our fees, we&apos;re an open book.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            { icon: "dollar" as const, title: "Fee-only", text: "No commissions. No product sales. Ever." },
            { icon: "shield" as const, title: "Fiduciary", text: "Advice inspired by your best interest, every time." },
            { icon: "award" as const, title: "Transparent", text: "Simple AUM-based pricing you can understand." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Icon name={item.icon} size={20} />
              </div>
              <h2 className="mt-4 font-display text-xl text-navy">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-muted">
          Our fee-only structure means you can count on professional advice inspired by your
          best interest, every time. With commission-free compensation, the only gain we&apos;re
          invested in is yours.
        </p>
      </Section>

      {/* Wealth Management Fees */}
      <Section background="cream" className="py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">
            Wealth Management
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Wealth Management Fees
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              Your financial planning experience should be seamless and adapted to your needs.
              Most of our clients benefit from a comprehensive approach that includes financial
              planning, investment management, or a combination of both.
            </p>
            <p>
              At NorthBridge, these services fall under the umbrella of wealth management,
              through which we provide personalized support for all of our clients, in every
              stage of life.
            </p>
            <p>
              We offer our Wealth Management services for a fee based on a percentage of assets
              under management (AUM), billed quarterly in arrears.
            </p>
            <p className="font-medium text-navy">
              Our fee structure for wealth management is simple: it&apos;s based on the value of
              your portfolio.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            {/* Mobile: stacked cards with rate visible per tier */}
            <ul className="divide-y divide-border md:hidden">
              {wealthManagementFeeTiers.map((tier) => (
                <li
                  key={tier.range}
                  className="flex items-start justify-between gap-4 px-5 py-4"
                >
                  <p className="text-sm leading-relaxed text-muted">{tier.range}</p>
                  <p className="shrink-0 text-sm font-semibold text-navy">{tier.rate}</p>
                </li>
              ))}
            </ul>

            {/* Desktop: table */}
            <table className="hidden w-full text-left text-sm md:table">
              <thead>
                <tr className="border-b border-border bg-cream">
                  <th className="px-6 py-4 font-semibold text-navy">Portfolio Assets</th>
                  <th className="px-6 py-4 font-semibold text-navy">Annual % Fee</th>
                </tr>
              </thead>
              <tbody>
                {wealthManagementFeeTiers.map((tier, i) => (
                  <tr
                    key={tier.range}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream/50"}
                  >
                    <td className="px-6 py-4 text-muted">{tier.range}</td>
                    <td className="px-6 py-4 font-semibold text-navy">{tier.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-muted">
            After the initial billing period, all clients are subject to a minimum quarterly
            fee of <span className="font-semibold text-navy">$1,625.00</span>.
          </p>

          <p className="mt-6">
            <Link
              href="/services/wealth-management"
              className="text-sm font-semibold text-gold hover:text-navy"
            >
              Learn about Wealth Management →
            </Link>
          </p>
        </div>
      </Section>

      {/* Foundations */}
      <Section className="py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">
            Young Professionals
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Foundations Fees
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              If you&apos;re a young professional with a portfolio of less than $250,000, our
              Foundations program is best suited for you. The goal of Foundations is to
              jumpstart your wealth over the course of four years. As your wealth increases
              during that time, so do the fees associated with Foundations.
            </p>
            <p>
              After four years, you graduate into a traditional wealth management relationship
              with NorthBridge. You can see the fees for wealth management above.
            </p>
          </div>
          <p className="mt-6">
            <Link
              href="/services/foundations"
              className="text-sm font-semibold text-gold hover:text-navy"
            >
              Learn about Foundations →
            </Link>
          </p>
        </div>
      </Section>

      {/* Related */}
      <Section background="cream" className="py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl text-navy">Learn more</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/answers/how-does-fee-only-financial-planning-work"
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
            >
              How fee-only planning works
            </Link>
            <Link
              href="/answers/what-is-a-fiduciary"
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
            >
              What is a fiduciary?
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-navy md:text-4xl">Common questions</h2>
          <div className="mt-8">
            <FAQAccordion faqs={feesFaqs} />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Have more questions about our fees?
          </h2>
          <p className="mt-4 text-white/70">
            Or about starting a relationship with NorthBridge? We&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/schedule" variant="secondary" size="lg" trackEvent="fees_schedule">
              Schedule a Consultation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-navy"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
