import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs, Button } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { locations } from "@/content/locations";

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
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Schedule Consultation", url: "/schedule" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Schedule Consultation" }]} />
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Schedule a complimentary consultation"
            description="We'd love to meet you. Schedule a low-stress, no-obligation meeting with one of our advisors today."
            centered
          />

          <div className="mt-8 rounded-2xl border border-border bg-cream p-10">
            <h2 className="font-serif text-xl text-navy">What to expect</h2>
            <ul className="mt-6 space-y-4 text-left text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white">
                  1
                </span>
                A friendly conversation about your goals and financial situation
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white">
                  2
                </span>
                An overview of how Market Street can help — no sales pitch
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white">
                  3
                </span>
                Time to ask questions and determine if we&apos;re the right fit
              </li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary" trackEvent="schedule_contact">
              Contact Us to Schedule
            </Button>
            {locations.map((loc) => (
              <Button
                key={loc.id}
                href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                variant="outline"
                trackEvent="schedule_phone"
              >
                Call {loc.city}
              </Button>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            Prefer to reach out online?{" "}
            <a href="/contact" className="font-medium text-navy hover:text-gold">
              Fill out our contact form
            </a>{" "}
            and we&apos;ll be in touch to schedule your meeting.
          </p>
        </div>
      </Section>
    </>
  );
}
