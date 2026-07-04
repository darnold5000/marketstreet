import {
  Hero,
  TrustIndicators,
  ValueProps,
  ServicesOverview,
  WhoWeHelp,
  OurProcess,
  MeetAdvisors,
  EducationalResources,
  LocationsPreview,
} from "@/components/home/sections";
import { CTABanner } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <ValueProps />
      <ServicesOverview />
      <WhoWeHelp />
      <OurProcess />
      <MeetAdvisors />
      <EducationalResources />
      <LocationsPreview />
      <CTABanner
        title="Complimentary Initial Meetings"
        description="We'd love to meet you. Schedule a low-stress, no-obligation meeting with us today."
        buttonText="Speak with an Advisor"
        buttonHref="/schedule"
      />
    </>
  );
}
