import { Icon } from "@/components/icons";
import type {
  DisclosureBlock,
  DisclosureCalloutTitle,
  DisclosureSection,
} from "@/content/disclosures";

const calloutIcons: Record<DisclosureCalloutTitle, "shield" | "chart" | "file" | "building"> = {
  "Registration Information": "building",
  "Risk Reminder": "chart",
  "Past Performance": "chart",
  "No Legal or Tax Advice": "file",
};

function DisclosureCallout({
  title,
  text,
}: {
  title: DisclosureCalloutTitle;
  text: string;
}) {
  return (
    <aside
      className="rounded-2xl border border-gold/25 bg-cream/60 p-6 md:p-7"
      aria-label={title}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon name={calloutIcons[title]} size={18} />
        </div>
        <h3 className="font-display text-lg text-navy">{title}</h3>
      </div>
      <p className="text-[0.98rem] leading-[1.85] text-foreground/85">{text}</p>
    </aside>
  );
}

function DisclosureParagraph({ text }: { text: string }) {
  return (
    <p className="text-[0.98rem] leading-[1.85] text-foreground/85">{text}</p>
  );
}

function DisclosureBody({ blocks }: { blocks: DisclosureBlock[] }) {
  return (
    <div className="mx-auto max-w-[800px] space-y-7 animate-fade-up">
      {blocks.map((block, index) =>
        block.type === "callout" ? (
          <DisclosureCallout key={index} title={block.title} text={block.text} />
        ) : (
          <DisclosureParagraph key={index} text={block.text} />
        )
      )}
    </div>
  );
}

export function DisclosureAccordion({ sections }: { sections: DisclosureSection[] }) {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {sections.map((section) => (
        <details
          key={section.id}
          className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow duration-300 open:shadow-md"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cream/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold [&::-webkit-details-marker]:hidden md:px-8 md:py-6">
            <h2 className="font-display text-2xl text-navy md:text-3xl">{section.title}</h2>
            <Icon
              name="chevron-down"
              size={22}
              className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-border px-6 pt-8 pb-10 md:px-8 md:pb-12">
            <DisclosureBody blocks={section.blocks} />
          </div>
        </details>
      ))}
    </div>
  );
}

export function AdditionalDocuments() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="font-display text-2xl text-navy md:text-3xl">Additional Documents</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Download our regulatory filings for more detail on our advisory services, fees, and
        business practices.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li>
          {/* TODO: Link to Form ADV Brochure PDF when available */}
          <div className="flex h-full items-center gap-4 rounded-2xl border border-dashed border-border bg-cream/30 px-6 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
              <Icon name="file" size={20} />
            </div>
            <div>
              <p className="font-medium text-navy">Form ADV Brochure</p>
              <p className="mt-1 text-sm text-muted">PDF coming soon</p>
            </div>
          </div>
        </li>
        <li>
          {/* TODO: Link to Form CRS PDF when available */}
          <div className="flex h-full items-center gap-4 rounded-2xl border border-dashed border-border bg-cream/30 px-6 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
              <Icon name="file" size={20} />
            </div>
            <div>
              <p className="font-medium text-navy">Form CRS</p>
              <p className="mt-1 text-sm text-muted">PDF coming soon</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
