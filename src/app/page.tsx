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

export default function HomePage() {
  return (
    <>
      <Hero />
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
