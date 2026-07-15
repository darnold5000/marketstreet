import { createMetadata } from "@/lib/metadata";
import { Section, SectionHeader, Breadcrumbs, CTABanner } from "@/components/ui";
import { AdvisorCard } from "@/components/team/TeamPhoto";
import { AssociationBadges } from "@/components/trust";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, personSchema, webPageSchema } from "@/lib/schema";
import { teamMembers } from "@/content/team";

export const metadata = createMetadata({
  title: "Meet the Team",
  description:
    "Meet the NorthBridge Wealth team — Certified Financial Planners, CPAs, and financial experts dedicated to your success.",
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
            "Meet the NorthBridge Wealth team",
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
          description="At NorthBridge, we believe we've found the ideal balance of professionalism and personality. We understand money is personal, and true wealth is so much more than just money."
        />

        <h3 className="mb-8 font-serif text-2xl text-navy">Financial Advisors</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {advisors.map((member) => (
            <AdvisorCard key={member.slug} member={member} />
          ))}
        </div>

        <h3 className="mt-16 mb-8 font-serif text-2xl text-navy">
          Operations & Support Team
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {support.map((member) => (
            <AdvisorCard key={member.slug} member={member} showBio={true} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-center font-serif text-2xl text-navy">
            Professional Associations
          </h3>
          <AssociationBadges />
        </div>
      </Section>

      <CTABanner
        title="Ready to meet your advisor?"
        description="Schedule a complimentary, no-obligation consultation to find the right match for your financial goals."
      />
    </>
  );
}
