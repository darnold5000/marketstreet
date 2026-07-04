import Link from "next/link";
import { Button, Section, SectionHeader, Card } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { getFeaturedAdvisors } from "@/content/team";
import { getRecentPosts } from "@/content/blog";
import { locations } from "@/content/locations";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-navy to-navy" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-sm font-semibold tracking-wider text-gold uppercase">
            Fee-Only Fiduciary Advisors
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Financial planning doesn&apos;t have to be complicated.
            <span className="mt-2 block text-gold-light">Let us simplify it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            You deserve the peace of mind that comes from working with a reliable
            financial partner. Market Street delivers a clear, actionable plan that
            makes your money work for you, while you live the life you&apos;ve envisioned.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/schedule" variant="secondary" trackEvent="hero_schedule">
              Schedule Consultation
            </Button>
            <Button href="/about" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-navy">
              Learn About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustIndicators() {
  return (
    <Section className="py-12 md:py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        {siteConfig.trustIndicators.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-serif text-3xl text-navy md:text-4xl">{item.value}</p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ServicesOverview() {
  return (
    <Section background="cream">
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
    <Section>
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
            className="rounded-2xl border border-border p-8 transition-all hover:border-gold/30 hover:shadow-md"
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
    <Section background="cream">
      <SectionHeader
        eyebrow="Our Process"
        title="A clear path from conversation to confidence"
        centered
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {siteConfig.process.map((step) => (
          <div key={step.step} className="relative">
            <span className="font-serif text-5xl text-gold/30">{step.step}</span>
            <h3 className="mt-2 font-serif text-xl text-navy">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
          </div>
        ))}
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
        title="Professional expertise with genuine personality"
        description="At Market Street, we believe we've found the ideal balance of professionalism and personality. Our team cares about your priorities, passions, and future."
        centered
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {advisors.map((advisor) => (
          <Link
            key={advisor.slug}
            href="/team"
            className="group text-center"
          >
            <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-cream text-3xl font-serif text-navy transition-colors group-hover:bg-navy group-hover:text-white">
              {advisor.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="font-serif text-lg text-navy">{advisor.name}</h3>
            {advisor.credentials && (
              <p className="text-sm text-gold">{advisor.credentials}</p>
            )}
            <p className="mt-1 text-sm text-muted">{advisor.title}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/team" variant="outline">
          Meet Our Full Team
        </Button>
      </div>
    </Section>
  );
}

export function EducationalResources() {
  const posts = getRecentPosts(3);

  return (
    <Section background="cream">
      <SectionHeader
        eyebrow="Educational Resources"
        title="Insights from our advisors"
        description="Expert guidance on financial planning, retirement, and building wealth — written by the professionals who live it every day."
        centered
      />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} href={`/resources/blog/${post.slug}`}>
            <p className="text-xs font-semibold tracking-wider text-gold uppercase">
              {post.category}
            </p>
            <h3 className="mt-2 font-serif text-xl text-navy">{post.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-4 text-xs text-muted">{post.readTime}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/resources/blog" variant="outline">
          View All Articles
        </Button>
      </div>
    </Section>
  );
}

export function LocationsPreview() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our Locations"
        title="Local offices, nationwide reach"
        description="Visit us in Indianapolis or Crawfordsville, or connect virtually from anywhere in the country."
        centered
      />
      <div className="grid gap-8 md:grid-cols-2">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="rounded-2xl border border-border p-8"
          >
            <h3 className="font-serif text-xl text-navy">{loc.name}</h3>
            <address className="mt-4 not-italic text-muted">
              <p>{loc.address}</p>
              <p>
                {loc.city}, {loc.state} {loc.zip}
              </p>
            </address>
            <a
              href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`}
              className="mt-3 inline-block font-medium text-navy hover:text-gold"
              data-track="phone_click"
            >
              {loc.phone}
            </a>
            <p className="mt-2 text-sm text-muted">{loc.hours}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ValueProps() {
  const props = [
    {
      title: "Comprehensive Wealth Management",
      description:
        "Live a fulfilling life and optimize your current assets, while you save and plan for the future — you don't need to sacrifice one for the other.",
    },
    {
      title: "Mutual Commitment",
      description:
        "When you choose Market Street, you're making an investment in your financial future. We provide personalized advice backed by mutually committed client-advisor relationships.",
    },
    {
      title: "Pros On Your Team",
      description:
        "With our fee-only structure and continuous fund monitoring, you'll feel confident that your advisors are working for you and your best interests.",
    },
    {
      title: "Education and Empowerment",
      description:
        "You'll feel supported to make informed, empowered decisions with Market Street's focus on client education and knowledge-sharing.",
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
