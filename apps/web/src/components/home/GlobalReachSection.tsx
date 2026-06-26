"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

const COUNTRIES = [
  "🇧🇩 Bangladesh",
  "🇺🇸 USA",
  "🇬🇧 UK",
  "🇦🇺 Australia",
  "🇨🇦 Canada",
  "🇦🇪 UAE",
  "🇸🇦 Saudi Arabia",
  "🇲🇾 Malaysia",
  "🇩🇪 Germany",
  "🇫🇷 France",
  "🇯🇵 Japan",
  "🇸🇬 Singapore",
] as const;

export function GlobalReachSection() {
  const doubled = [...COUNTRIES, ...COUNTRIES];

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface-muted/30 py-16 sm:py-20"
      aria-labelledby="global-heading"
    >
      <div className="site-container mb-10">
        <SectionHeader
          id="global-heading"
          eyebrow="Global community"
          title={
            <>
              Our coders are from{" "}
              <span className="gradient-text">around the globe</span>
            </>
          }
          description="Bangladeshi roots, world-class standards — families from 20+ countries trust live coding education that works."
          align="center"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-muted/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-muted/30 to-transparent" />

        <div className="flex animate-marquee motion-reduce:animate-none whitespace-nowrap">
          {doubled.map((country, index) => (
            <span
              key={`${country}-${index}`}
              className="mx-6 inline-flex items-center gap-2 rounded-pill border border-border bg-surface-glass px-5 py-2.5 text-sm font-semibold text-content-muted shadow-glass backdrop-blur-xl"
            >
              {country}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
