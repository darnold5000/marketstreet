import {
  Hero,
  TrustStats,
  StoryStatement,
  StoryPhoto,
  CoreBenefits,
  ServicesOverview,
  OurProcess,
  MeetAdvisors,
  EducationalResources,
  LocationsPreview,
  FinalCTA,
} from "@/components/home/sections";
import { getHomepageContent } from "@/lib/content/public";

export default async function HomePage() {
  const home = await getHomepageContent();

  return (
    <>
      <Hero
        headline={home.headline}
        intro={home.intro}
        ctaLabel={home.cta_primary_label}
        ctaHref={home.cta_primary_href}
        secondaryLabel={home.cta_secondary_label}
        secondaryHref={home.cta_secondary_href}
        heroImageUrl={home.hero_image_url || undefined}
      />
      <TrustStats />
      <StoryStatement />
      <StoryPhoto />
      <CoreBenefits />
      <ServicesOverview />
      <OurProcess />
      <MeetAdvisors />
      <EducationalResources />
      <LocationsPreview />
      <FinalCTA />
    </>
  );
}
