"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  { value: 500, suffix: "+", label: "Happy families", detail: "Across Bangladesh & abroad" },
  { value: 20, suffix: "+", label: "Countries", detail: "Global student community" },
  { value: 95, suffix: "%", label: "Retention rate", detail: "Kids who keep learning" },
  { value: 4.9, suffix: "", label: "Parent rating", detail: "Trusted by families", decimals: 1 },
] as const;

export function StatsBar() {
  return (
    <section
      className="relative border-y border-border bg-brand-green-dark py-14 text-white sm:py-16 dark:bg-[#0D0020]"
      aria-label="BrainStack highlights"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(34,197,94,0.2),transparent_70%)]"
      />

      <div className="site-container relative grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <div className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold text-brand-yellow-light sm:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </p>
              <p className="mt-2 font-display text-base font-semibold">{stat.label}</p>
              <p className="mt-1 text-sm text-white/60">{stat.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
