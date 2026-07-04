import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs, CTABanner, Button } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/schema";
import { locations } from "@/content/locations";

export const metadata = createMetadata({
  title: "Office Locations",
  description:
    "Visit Market Street Wealth Management in Indianapolis or Crawfordsville, Indiana. We also serve clients nationwide through virtual meetings.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Office Locations",
            "Market Street Wealth Management office locations",
            "/locations"
          ),
          ...localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Locations", url: "/locations" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Locations" }]} />
        <SectionHeader
          eyebrow="Our Offices"
          title="Local offices, nationwide reach"
          description="Visit us in person at our Indianapolis or Crawfordsville offices, or connect with us virtually from anywhere in the country."
          centered
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {locations.map((loc) => (
            <div
              key={loc.id}
              id={loc.id}
              className="rounded-2xl border border-border p-10"
            >
              <h2 className="font-serif text-2xl text-navy">{loc.name}</h2>
              <address className="mt-6 not-italic leading-relaxed text-muted">
                <p>{loc.address}</p>
                <p>
                  {loc.city}, {loc.state} {loc.zip}
                </p>
              </address>
              <a
                href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                className="mt-4 inline-block text-lg font-medium text-navy hover:text-gold"
                data-track="phone_click"
              >
                {loc.phone}
              </a>
              <p className="mt-3 text-sm text-muted">{loc.hours}</p>
              <div className="mt-6 flex gap-4">
                <Button
                  href={loc.mapUrl}
                  variant="outline"
                  external
                >
                  Get Directions
                </Button>
                <Button href="/schedule" variant="primary" trackEvent="location_schedule">
                  Schedule Visit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Can't visit in person?"
        description="We serve clients nationwide through secure virtual meetings. Schedule a complimentary consultation from wherever you are."
      />
    </>
  );
}
