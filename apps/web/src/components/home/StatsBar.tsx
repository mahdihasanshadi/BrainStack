"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  { value: 3, suffix: "", label: "Age tracks", detail: "Tailored learning paths" },
  { value: 100, suffix: "%", label: "Live classes", detail: "Real instructors" },
  { value: 2, suffix: "", label: "Languages", detail: "Bangla & English" },
  { value: 0, suffix: "", label: "Trial cost", detail: "Start completely free", prefix: "৳" },
] as const;

export function StatsBar() {
  return (
    <section
      className="relative border-y border-border bg-surface-muted/50 py-12 backdrop-blur-sm sm:py-16"
      aria-label="BrainStack highlights"
    >
      <div className="site-container grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <div className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold text-content sm:text-5xl">
                {"prefix" in stat && stat.prefix ? (
                  <>
                    {stat.prefix}
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </>
                ) : (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-2 font-display text-base font-semibold text-content">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-content-faint">{stat.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
