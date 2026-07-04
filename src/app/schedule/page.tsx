import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs } from "@/components/ui";
import { CalendlyEmbed } from "@/components/schedule/CalendlyEmbed";
import { FirstMeetingTimeline } from "@/components/trust";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema, faqSchema } from "@/lib/schema";
import { firstMeetingSteps } from "@/content/trust";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export const metadata = createMetadata({
  title: "Schedule a Consultation",
  description:
    "Schedule a complimentary, no-obligation consultation with a Market Street Wealth Management advisor. Low-stress, personalized financial planning.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Schedule a Consultation",
            "Schedule a complimentary consultation with Market Street",
            "/schedule"
          ),
          faqSchema([
            {
              question: "Is the first meeting free?",
              answer:
                "Yes. Your initial consultation is complimentary with no obligation to become a client.",
            },
            {
              question: "How long is the first meeting?",
              answer:
                "Initial consultations typically last 45–60 minutes.",
            },
          ]),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Schedule Consultation", url: "/schedule" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Schedule Consultation" }]} />
        <SectionHeader
          eyebrow="Get Started"
          title="Schedule your complimentary consultation"
          description="We'd love to meet you. Pick a time that works — it's a low-stress, no-obligation conversation with a fee-only, fiduciary advisor."
          centered
        />

        <div className="mx-auto max-w-4xl">
          <CalendlyEmbed url={CALENDLY_URL} />
        </div>

        {!CALENDLY_URL && (
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="rounded-full bg-navy px-7 py-3.5 text-center text-sm font-semibold text-white hover:bg-navy-light"
            >
              Contact Us to Schedule
            </a>
            <a
              href="tel:3175520505"
              className="rounded-full border-2 border-navy px-7 py-3.5 text-center text-sm font-semibold text-navy hover:bg-navy hover:text-white"
              data-track="schedule_phone"
            >
              Call (317) 552-0505
            </a>
          </div>
        )}
      </Section>

      <Section background="cream">
        <SectionHeader
          eyebrow="What to Expect"
          title="Your first meeting, step by step"
          description="Here's exactly what happens during your complimentary consultation — no surprises, no sales pitch."
          centered
        />
        <div className="mx-auto max-w-2xl">
          <FirstMeetingTimeline />
        </div>
      </Section>
    </>
  );
}
