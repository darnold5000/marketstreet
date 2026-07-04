import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  className?: string;
  external?: boolean;
  trackEvent?: string;
}

const variants = {
  primary: "bg-navy text-white hover:bg-navy-light",
  secondary: "bg-gold text-white hover:bg-gold-light",
  outline:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white",
};

const sizes = {
  default: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  external,
  trackEvent,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  const isExternal =
    external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        data-track={trackEvent}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-track={trackEvent}>
      {children}
    </Link>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "cream" | "navy";
}

const backgrounds = {
  default: "bg-background",
  cream: "bg-cream",
  navy: "bg-navy text-white",
};

export function Section({
  children,
  className = "",
  id,
  background = "default",
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold tracking-wider uppercase ${light ? "text-gold" : "text-gold"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl leading-tight md:text-4xl lg:text-5xl ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-white/70" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className = "", href }: CardProps) {
  const classes = `rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-gold/30 ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

interface FAQAccordionProps {
  faqs: { question: string; answer: string }[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {faqs.map((faq, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left font-medium text-navy transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
            {faq.question}
            <svg
              className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-5 text-muted leading-relaxed">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  light?: boolean;
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${light ? "text-white/60" : "text-muted"}`}>
        <li>
          <Link href="/" className={light ? "hover:text-white" : "hover:text-navy"}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className={light ? "hover:text-white" : "hover:text-navy"}>
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-navy"}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface CTABannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  title,
  description,
  buttonText = "Schedule Consultation",
  buttonHref = "/schedule",
}: CTABannerProps) {
  return (
    <Section background="navy">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl text-white md:text-4xl">{title}</h2>
        <p className="mt-5 text-lg text-white/70">{description}</p>
        <div className="mt-8">
          <Button href={buttonHref} variant="secondary" trackEvent="cta_schedule">
            {buttonText}
          </Button>
        </div>
      </div>
    </Section>
  );
}
