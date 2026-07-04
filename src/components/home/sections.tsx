import Image from "next/image";
import Link from "next/link";
import { Button, Section, SectionHeader, Card } from "@/components/ui";
import { TrustBadgeBar, FirstMeetingTimeline, TrustCTA } from "@/components/trust";
import { TeamPhoto } from "@/components/team/TeamPhoto";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { getFeaturedAdvisors } from "@/content/team";
import { getRecentPosts } from "@/content/blog";
import { locations } from "@/content/locations";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy">
      <Image
        src="/images/hero-office.jpg"
        alt="Market Street Wealth Management office in Indianapolis, Indiana"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-sm font-medium text-gold-light">
              Fee-Only · Fiduciary · Since 2001
            </span>
          </div>
          <h1 className="font-serif text-4xl leading-[1.08] text-white md:text-5xl lg:text-6xl">
            Your money should work as hard as you do.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
            Market Street delivers clear, actionable financial planning for Indiana
            professionals and families — without the complexity, conflicts, or
            commission-driven advice.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/schedule" variant="secondary" trackEvent="hero_schedule">
              Schedule Free Consultation
            </Button>
            <Button
              href="/answers/what-is-a-fiduciary"
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-navy"
            >
              Why Fee-Only Matters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustIndicators() {
  return (
    <>
      <TrustBadgeBar />
      <Section className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {siteConfig.trustIndicators.map((item, i) => (
            <div
              key={item.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="font-serif text-3xl text-navy md:text-4xl">{item.value}</p>
              <p className="mt-1 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function OfficeShowcase() {
  return (
    <Section background="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/team-advising.jpg"
            alt="Market Street advisors meeting with clients"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <SectionHeader
            eyebrow="Indiana Roots, Nationwide Reach"
            title="A team that knows you — not just your portfolio"
            description="Founded in Indianapolis in 2001, Market Street has grown into one of Indiana's most trusted independent advisory firms. We serve clients locally and nationwide with the same personal, fiduciary commitment."
          />
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-semibold text-gold hover:text-navy"
          >
            Learn our story
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function ServicesOverview() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our Services"
        title="Comprehensive financial planning for every stage of life"
        description="From building your foundation to managing complex wealth, we provide personalized guidance backed by a fee-only, fiduciary commitment."
        centered
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} href={`/services/${service.slug}`}>
            <h3 className="font-serif text-xl text-navy">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.shortDescription}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold">
              Learn more
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function WhoWeHelp() {
  return (
    <Section background="cream">
      <SectionHeader
        eyebrow="Who We Help"
        title="A financial firm for young and seasoned professionals, alike"
        description="Whether you're building your career or enjoying retirement, Market Street provides the guidance you need at every stage."
        centered
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.whoWeHelp.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-white p-8 transition-all hover:border-gold/30 hover:shadow-md"
          >
            <h3 className="font-serif text-xl text-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function OurProcess() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our Process"
        title="A clear path from conversation to confidence"
        centered
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <div
            key={step.step}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <span className="font-serif text-5xl text-gold/30">{step.step}</span>
            <h3 className="mt-2 font-serif text-xl text-navy">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/schedule" variant="outline" trackEvent="process_schedule">
          Start with a Free Consultation
        </Button>
      </div>
    </Section>
  );
}

export function FirstMeetingPreview() {
  return (
    <Section background="cream">
      <SectionHeader
        eyebrow="What to Expect"
        title="Your first meeting is complimentary — and zero pressure"
        description="Here's exactly what happens when you sit down with a Market Street advisor."
        centered
      />
      <div className="mx-auto max-w-2xl">
        <FirstMeetingTimeline />
      </div>
      <div className="mt-10 text-center">
        <Button href="/schedule" variant="primary" trackEvent="first_meeting_schedule">
          Schedule Your Free Meeting
        </Button>
      </div>
    </Section>
  );
}

export function MeetAdvisors() {
  const advisors = getFeaturedAdvisors().slice(0, 4);

  return (
    <Section>
      <SectionHeader
        eyebrow="Meet the Advisors"
        title="Certified experts who genuinely care"
        description="CFP® professionals, CPAs, and qualified financial experts — with the personality to match."
        centered
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {advisors.map((advisor) => (
          <Link key={advisor.slug} href="/team" className="group text-center">
            <div className="mx-auto mb-4 transition-transform group-hover:scale-105">
              <TeamPhoto member={advisor} size="lg" className="mx-auto" />
            </div>
            <h3 className="font-serif text-lg text-navy">
              {advisor.name}
              {advisor.credentials && (
                <span className="text-gold">, {advisor.credentials}</span>
              )}
            </h3>
            <p className="mt-1 text-sm text-muted">{advisor.title}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/team" variant="outline">Meet Our Full Team</Button>
      </div>
    </Section>
  );
}

export function EducationalResources() {
  const posts = getRecentPosts(3);

  return (
    <Section background="cream">
      <SectionHeader
        eyebrow="From Our Advisors"
        title="Insights you can trust"
        description="Expert guidance written by the professionals who live it every day — not ghostwriters."
        centered
      />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} href={`/resources/blog/${post.slug}`}>
            <p className="text-xs font-semibold tracking-wider text-gold uppercase">
              {post.category}
            </p>
            <h3 className="mt-2 font-serif text-xl text-navy line-clamp-2">{post.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>
            <p className="mt-4 text-xs text-muted">{post.readTime}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/resources/blog" variant="outline">View All Articles</Button>
        <Button href="/answers/what-is-a-fiduciary" variant="outline">Financial Planning Answers</Button>
      </div>
    </Section>
  );
}

export function LocationsPreview() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our Locations"
        title="Local offices in Indiana, clients nationwide"
        centered
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[320px]">
          <Image
            src="/images/team-group.jpg"
            alt="Market Street Wealth Management team"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          {locations.map((loc) => (
            <div key={loc.id} className="rounded-2xl border border-border p-8">
              <h3 className="font-serif text-xl text-navy">{loc.name}</h3>
              <address className="mt-3 not-italic text-muted">
                <p>{loc.address}</p>
                <p>{loc.city}, {loc.state} {loc.zip}</p>
              </address>
              <a
                href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
                className="mt-2 inline-block font-medium text-navy hover:text-gold"
                data-track="phone_click"
              >
                {loc.phone}
              </a>
              <p className="mt-1 text-sm text-muted">{loc.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ValueProps() {
  const props = [
    {
      title: "Comprehensive Wealth Management",
      description:
        "Optimize your current assets while planning for the future — you don't need to sacrifice one for the other.",
    },
    {
      title: "Mutual Commitment",
      description:
        "Personalized advice backed by mutually committed client-advisor relationships and open, honest communication.",
    },
    {
      title: "Pros On Your Team",
      description:
        "Fee-only structure and continuous fund monitoring — your advisors work exclusively for you.",
    },
    {
      title: "Education and Empowerment",
      description:
        "Make informed, empowered decisions with our focus on client education and knowledge-sharing.",
    },
  ];

  return (
    <Section>
      <SectionHeader
        eyebrow="The Market Street Difference"
        title="More than a traditional wealth management firm"
        centered
      />
      <div className="grid gap-8 md:grid-cols-2">
        {props.map((item) => (
          <div key={item.title} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export { TrustCTA };
