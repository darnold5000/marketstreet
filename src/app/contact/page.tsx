import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { locations } from "@/content/locations";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Market Street Wealth Management. Reach our Indianapolis or Crawfordsville offices, or send us a message online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema("Contact Us", "Contact Market Street Wealth Management", "/contact"),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact Market Street today"
          description="Whether you're ready to become a client or just have a question, we'd love to hear from you."
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-navy">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy">Our offices</h2>
            <div className="mt-6 space-y-8">
              {locations.map((loc) => (
                <div key={loc.id} className="rounded-2xl border border-border p-6">
                  <h3 className="font-serif text-lg text-navy">{loc.name}</h3>
                  <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
                    <p>{loc.address}</p>
                    <p>
                      {loc.city}, {loc.state} {loc.zip}
                    </p>
                  </address>
                  <a
                    href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                    className="mt-2 inline-block text-sm font-medium text-navy hover:text-gold"
                    data-track="phone_click"
                  >
                    {loc.phone}
                  </a>
                  <p className="mt-1 text-sm text-muted">{loc.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
