"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export function CalendlyEmbed({ url, className = "" }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!url) {
    return (
      <div className={`rounded-2xl border border-dashed border-border bg-cream p-12 text-center ${className}`}>
        <p className="font-serif text-xl text-navy">Scheduling widget coming soon</p>
        <p className="mt-3 text-sm text-muted">
          Set <code className="rounded bg-white px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CALENDLY_URL</code> in
          your environment to enable online scheduling.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`calendly-inline-widget min-h-[650px] w-full rounded-2xl overflow-hidden ${className}`}
      data-url={url}
      style={{ minWidth: "320px", height: "650px" }}
    />
  );
}
