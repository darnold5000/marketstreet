import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import {
  ClientLoginDropdown,
  ClientLoginMobileSection,
  ClientLoginFooterLinks,
} from "@/components/layout/ClientLogin";

export const navigation = {
  main: [
    { label: "About", href: "/about" },
    { label: "Our Fees", href: "/fees" },
    { label: "Team", href: "/team" },
    {
      label: "Services",
      href: "/services/wealth-management",
      children: [
        { label: "Wealth Management", href: "/services/wealth-management" },
        { label: "Retirement Planning", href: "/services/retirement-planning" },
        {
          label: "Business Retirement Plans",
          href: "/services/business-retirement-plans",
        },
        { label: "Foundations", href: "/services/foundations" },
        {
          label: "Investment Management",
          href: "/services/investment-management",
        },
      ],
    },
    {
      label: "Resources",
      href: "/resources/blog",
      children: [
        { label: "Blog", href: "/resources/blog" },
        { label: "FAQ", href: "/resources/faq" },
        { label: "Educational Guides", href: "/resources/guides" },
        { label: "Financial Answers", href: "/answers" },
      ],
    },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={207}
            height={62}
            className="h-[46px] w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {navigation.main.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-cream hover:text-navy"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute top-full left-0 z-50 min-w-[220px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-border bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-cream hover:text-navy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ClientLoginDropdown />
          <Link
            href="/schedule"
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:inline-block"
          >
            Schedule Consultation
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative lg:hidden">
      <summary className="cursor-pointer list-none rounded-lg p-2 hover:bg-cream [&::-webkit-details-marker]:hidden">
        <svg className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="sr-only">Open menu</span>
      </summary>
      <div className="absolute top-full right-0 mt-2 max-h-[80vh] w-72 overflow-y-auto rounded-xl border border-border bg-white py-4 shadow-xl">
        {navigation.main.map((item) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="block px-6 py-2.5 text-sm font-medium text-navy hover:bg-cream"
            >
              {item.label}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block py-2 pr-6 pl-10 text-sm text-muted hover:bg-cream hover:text-navy"
              >
                {child.label}
              </Link>
            ))}
          </div>
        ))}
        <ClientLoginMobileSection />
        <div className="mt-2 space-y-2 border-t border-border px-6 pt-4">
          <Link
            href="/schedule"
            className="block rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </details>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={160}
                height={48}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Services
            </h3>
            <ul className="space-y-2.5">
              {navigation.main
                .find((n) => n.label === "Services")
                ?.children?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-sm text-white/70 hover:text-white">
                  Our Fees
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-white/70 hover:text-white">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/resources/blog" className="text-sm text-white/70 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sm text-white/70 hover:text-white">
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Client Login
            </h3>
            <ClientLoginFooterLinks />
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-gold">
              Get Started
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/schedule" className="text-sm text-white/70 hover:text-white">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="text-sm text-white/70 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-white/50 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/disclosures" className="text-sm text-white/50 hover:text-white">
              Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
