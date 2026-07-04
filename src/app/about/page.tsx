import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Button, CTABanner } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Market Street Wealth Management — a fee-only, fiduciary financial planning firm founded in 2001, serving Indiana and clients nationwide.",
  path: "/about",
});

const values = [
  {
    title: "Family First",
    description:
      "Founded with families in mind, we prioritize genuine, personal relationships that act as a support system you can rely on.",
  },
  {
    title: "Trust Above All",
    description:
      "Trusting someone with your finances is a big deal. That's why we hold honesty and integrity at the core of our advisory process.",
  },
  {
    title: "Authentic Connections",
    description:
      "You'll find that we're genuine, transparent and open. Our every interaction and recommendation is rooted in honesty.",
  },
  {
    title: "Loyal Partnership",
    description:
      "We're here for the long haul, committed to growing with and guiding you throughout your financial journey.",
  },
  {
    title: "Commitment To Knowledge-Sharing",
    description:
      "We want you to feel confident and informed in every decision you make. Our team shares financial expertise to empower you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "About Us",
            "Learn about Market Street Wealth Management",
            "/about"
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <SectionHeader
          eyebrow="Who We Are"
          title="More than a traditional wealth management firm"
          description="Without the time and expertise to navigate constant market fluctuations, complex investment options, and time-sensitive decisions, you deserve a clear, achievable plan and a financial advisor who truly knows you."
        />
        <div className="prose-content max-w-3xl">
          <p>
            Conventional wealth management has left you looking for more — more than
            an abstract recommendation, unanswered questions, and limited guidance.
            You deserve an advisor who values you for more than your portfolio, and
            financial security that&apos;s backed by a clear plan, advice, and ongoing
            support. That&apos;s why Market Street operates differently.
          </p>
          <h2>Our Mission: Your Peace of Mind</h2>
          <p>
            At Market Street, we put you first. Our mission is simple: to empower you
            with clear financial direction designed around your life, so you can achieve
            peace of mind. At the foundation of our holistic approach is a true
            appreciation for you, your family, and your unique financial situation.
          </p>
          <p>
            Maybe you&apos;ve wondered if you can have it all: financial freedom today,
            confidence in your future, and a financial partner you can trust. With
            Market Street, you can.
          </p>
        </div>
      </Section>

      <Section background="cream">
        <SectionHeader
          eyebrow="What Sets Us Apart"
          title="Guided by integrity, aligned with your goals"
          centered
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <h3 className="font-serif text-xl text-navy">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            eyebrow="Your Success, Our Only Goal"
            title="Certified experts on your team"
            description="Our team is made up of Certified Financial Planners, Certified Public Accountants, and qualified financial experts. Our fee-only structure means we have no hidden agendas — when you succeed, we succeed."
            centered
          />
          <Button href="/team" variant="primary">
            Meet Our Team
          </Button>
        </div>
      </Section>

      <CTABanner
        title="Find Your Match Today"
        description="Schedule a complimentary consultation to discover how Market Street can help you achieve your financial goals."
      />
    </>
  );
}
