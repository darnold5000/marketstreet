import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs, CTABanner } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, personSchema, webPageSchema } from "@/lib/schema";
import { teamMembers } from "@/content/team";

export const metadata = createMetadata({
  title: "Meet the Team",
  description:
    "Meet the Market Street Wealth Management team — Certified Financial Planners, CPAs, and financial experts dedicated to your success.",
  path: "/team",
});

export default function TeamPage() {
  const advisors = teamMembers.filter((m) => m.role === "advisor");
  const support = teamMembers.filter((m) => m.role !== "advisor");

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Meet the Team",
            "Meet the Market Street Wealth Management team",
            "/team"
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Team", url: "/team" },
          ]),
          ...teamMembers.map(personSchema),
        ]}
      />

      <Section className="pt-16">
        <Breadcrumbs items={[{ label: "Meet the Team" }]} />
        <SectionHeader
          eyebrow="Our People"
          title="Professional expertise with genuine personality"
          description="At Market Street, we believe we've found the ideal balance of professionalism and personality. We understand money is personal, and true wealth is so much more than just money."
        />

        <h3 className="mb-8 font-serif text-2xl text-navy">Financial Advisors</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {advisors.map((member) => (
            <article
              key={member.slug}
              className="rounded-2xl border border-border p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cream font-serif text-2xl text-navy">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-serif text-xl text-navy">
                    {member.name}
                    {member.credentials && (
                      <span className="text-gold">, {member.credentials}</span>
                    )}
                  </h4>
                  <p className="text-sm text-muted">{member.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
              {member.specialties.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold tracking-wider text-navy uppercase">
                    Specialties
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-cream px-3 py-1 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted">
                <div>
                  <span className="font-semibold text-navy">At Market Street:</span>{" "}
                  Since {member.marketStreetSince}
                </div>
                <div>
                  <span className="font-semibold text-navy">Industry:</span> Since{" "}
                  {member.industrySince}
                </div>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-16 mb-8 font-serif text-2xl text-navy">
          Operations & Support Team
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {support.map((member) => (
            <article
              key={member.slug}
              className="rounded-2xl border border-border p-6"
            >
              <h4 className="font-serif text-lg text-navy">
                {member.name}
                {member.credentials && (
                  <span className="text-gold">, {member.credentials}</span>
                )}
              </h4>
              <p className="text-sm text-muted">{member.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Ready to meet your advisor?"
        description="Schedule a complimentary, no-obligation consultation to find the right match for your financial goals."
      />
    </>
  );
}
