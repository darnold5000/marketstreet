import Image from "next/image";
import Link from "next/link";
import { Button, Section } from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BlogCard } from "@/components/blog/BlogCard";
import { Icon, IconCircle, type IconName } from "@/components/icons";
import { TeamPhoto } from "@/components/team/TeamPhoto";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { getFeaturedAdvisors } from "@/content/team";
import { getRecentPosts } from "@/content/blog";
import { locations } from "@/content/locations";

const trustPills: { icon: IconName; label: string }[] = [
  { icon: "dollar", label: "Fee-Only" },
  { icon: "shield", label: "Fiduciary" },
  { icon: "award", label: "CFP®" },
  { icon: "calendar", label: "25+ Years" },
];

const coreBenefits = [
  {
    icon: "heart" as IconName,
    title: "Personal relationships",
    text: "We know your family, goals, and priorities — not just your portfolio.",
  },
  {
    icon: "shield" as IconName,
    title: "Zero conflicts",
    text: "Fee-only and fiduciary. We never sell products or earn commissions.",
  },
  {
    icon: "chart" as IconName,
    title: "Clear action plans",
    text: "Simple, actionable strategies you can understand and trust.",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-navy">
      <Image
        src="/images/hero-office.jpg"
        alt="Market Street Wealth Management office"
        fill
        priority
        className="object-cover opacity-25 img-zoom"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/70" />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-8 flex flex-wrap gap-3">
            {trustPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm"
              >
                <Icon name={pill.icon} size={15} className="text-gold" />
                {pill.label}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl">
            Wealth management built on trust.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl">
            Fee-only, fiduciary financial planning for Indiana professionals and families.
          </p>
          <div className="mt-10">
            <Button href="/schedule" variant="secondary" trackEvent="hero_schedule">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStats() {
  return (
    <section className="border-b border-border bg-white py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 lg:px-8">
        {[
          { value: 25, suffix: "+", label: "Years in business" },
          { value: 100, suffix: "%", label: "Fee-only & fiduciary" },
          { value: 2, suffix: "", label: "Indiana offices" },
          { value: 12, suffix: "+", label: "Team members" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="font-display text-4xl text-navy md:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StoryStatement() {
  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">
          The Market Street Difference
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
          Financial planning shouldn&apos;t feel complicated.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          We simplify it — with clear advice, honest fees, and advisors who actually know you.
        </p>
      </div>
    </Section>
  );
}

export function StoryPhoto() {
  return (
    <section className="relative h-[50vh] min-h-[360px] overflow-hidden md:h-[60vh]">
      <Image
        src="/images/team-advising.jpg"
        alt="Market Street advisors with clients"
        fill
        className="object-cover img-zoom"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/20" />
    </section>
  );
}

export function CoreBenefits() {
  return (
    <Section background="cream" className="py-20 md:py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {coreBenefits.map((item, i) => (
          <div
            key={item.title}
            className="hover-lift rounded-2xl border border-border bg-white p-8 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <IconCircle name={item.icon} />
            <h3 className="mt-5 font-display text-2xl text-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/about" variant="outline">
          Why Market Street
        </Button>
      </div>
    </Section>
  );
}

export function ServicesOverview() {
  return (
    <Section className="py-20 md:py-28">
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">Services</p>
        <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">How we help</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group hover-lift flex items-start gap-4 rounded-2xl border border-border bg-white p-6 animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <IconCircle name={service.icon as IconName} />
            <div>
              <h3 className="font-display text-xl text-navy group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{service.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function OurProcess() {
  return (
    <Section background="cream" className="py-20 md:py-28">
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">Process</p>
        <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Four steps to clarity</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <div
            key={step.step}
            className="relative text-center animate-fade-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-xl text-white">
              {step.step}
            </div>
            <h3 className="mt-5 font-display text-xl text-navy">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function MeetAdvisors() {
  const advisors = getFeaturedAdvisors().slice(0, 4);

  return (
    <Section className="py-20 md:py-28">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Your Team</p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Meet the advisors</h2>
        </div>
        <Button href="/team" variant="outline">View full team</Button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {advisors.map((advisor, i) => (
          <Link
            key={advisor.slug}
            href="/team"
            className="group text-center animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mx-auto transition-transform duration-300 group-hover:scale-105">
              <TeamPhoto member={advisor} size="lg" className="mx-auto" />
            </div>
            <h3 className="mt-4 font-display text-lg text-navy">
              {advisor.name}
              {advisor.credentials && (
                <span className="text-gold">, {advisor.credentials}</span>
              )}
            </h3>
            <p className="mt-1 text-sm text-muted">{advisor.title}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function EducationalResources() {
  const posts = getRecentPosts(3);

  return (
    <Section background="cream" className="py-20 md:py-28">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Insights</p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">From our advisors</h2>
        </div>
        <Button href="/resources/blog" variant="outline">All articles</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </Section>
  );
}

export function LocationsPreview() {
  return (
    <Section className="py-20 md:py-28">
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase">Locations</p>
        <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Indiana offices. Nationwide clients.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="hover-lift flex gap-5 rounded-2xl border border-border bg-white p-8"
          >
            <IconCircle name="map-pin" className="bg-navy/5 text-navy" />
            <div>
              <h3 className="font-display text-xl text-navy">{loc.name}</h3>
              <p className="mt-2 text-sm text-muted">
                {loc.address}, {loc.city}, {loc.state}
              </p>
              <a
                href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                className="mt-3 inline-block font-medium text-navy hover:text-gold"
                data-track="phone_click"
              >
                {loc.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="font-display text-4xl text-white md:text-5xl">
          Ready for a clearer financial future?
        </h2>
        <p className="mt-5 text-lg text-white/70">
          Complimentary. No obligation. Just an honest conversation.
        </p>
        <div className="mt-10">
          <Button href="/schedule" variant="secondary" trackEvent="cta_schedule">
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
