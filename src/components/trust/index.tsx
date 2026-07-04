import Image from "next/image";
import Link from "next/link";
import {
  trustBadges,
  professionalAssociations,
  firstMeetingSteps,
  fiduciaryExplanation,
  feeOnlyExplanation,
} from "@/content/trust";
import { FAQAccordion } from "@/components/ui";

export function TrustBadgeBar() {
  return (
    <div className="border-y border-border bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 lg:gap-16 lg:px-8">
        {trustBadges.map((badge) => (
          <div key={badge.id} className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src={badge.icon}
                alt=""
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">{badge.label}</p>
              <p className="text-xs text-muted">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AssociationBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {professionalAssociations.map((org) => (
        <div
          key={org.abbr}
          className="rounded-lg border border-border bg-white px-5 py-3 text-center"
        >
          <p className="text-sm font-semibold text-navy">{org.abbr}</p>
          <p className="text-xs text-muted">{org.name}</p>
        </div>
      ))}
    </div>
  );
}

export function FirstMeetingTimeline() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-6 hidden h-full w-px bg-border md:block" aria-hidden="true" />
      <div className="space-y-8">
        {firstMeetingSteps.map((step) => (
          <div key={step.step} className="relative flex gap-6 md:gap-8">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {step.step}
            </div>
            <div className="pb-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-serif text-xl text-navy">{step.title}</h3>
                <span className="text-xs font-medium text-gold">{step.duration}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TrustExplainerProps {
  data: typeof fiduciaryExplanation;
  variant?: "default" | "compact";
}

export function TrustExplainer({ data, variant = "default" }: TrustExplainerProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-navy md:text-4xl">{data.title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{data.summary}</p>
      <div className={`mt-10 space-y-8 ${variant === "compact" ? "max-w-3xl" : ""}`}>
        {data.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="font-serif text-xl text-navy">{section.heading}</h3>
            <p className="mt-3 leading-relaxed text-muted">{section.content}</p>
          </div>
        ))}
      </div>
      {data.faqs.length > 0 && (
        <div className="mt-12">
          <FAQAccordion faqs={data.faqs} />
        </div>
      )}
    </div>
  );
}

export function FiduciarySection() {
  return <TrustExplainer data={fiduciaryExplanation} />;
}

export function FeeOnlySection() {
  return <TrustExplainer data={feeOnlyExplanation} />;
}

export function TrustCTA() {
  return (
    <div className="rounded-2xl border border-gold/20 bg-cream p-8 text-center md:p-12">
      <p className="text-sm font-semibold tracking-wider text-gold uppercase">
        Ready to experience the difference?
      </p>
      <h3 className="mt-3 font-serif text-2xl text-navy md:text-3xl">
        Schedule a complimentary, no-obligation consultation
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        Meet with a fee-only, fiduciary advisor who puts your interests first.
        No sales pitch — just an honest conversation about your financial goals.
      </p>
      <Link
        href="/schedule"
        className="mt-6 inline-flex rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        data-track="trust_cta_schedule"
      >
        Schedule Your Free Consultation
      </Link>
    </div>
  );
}
