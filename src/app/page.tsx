import {
  Hero,
  TrustIndicators,
  ValueProps,
  OfficeShowcase,
  ServicesOverview,
  WhoWeHelp,
  OurProcess,
  FirstMeetingPreview,
  MeetAdvisors,
  EducationalResources,
  LocationsPreview,
  TrustCTA,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <ValueProps />
      <OfficeShowcase />
      <ServicesOverview />
      <WhoWeHelp />
      <OurProcess />
      <FirstMeetingPreview />
      <MeetAdvisors />
      <EducationalResources />
      <LocationsPreview />
      <TrustCTA />
    </>
  );
}
