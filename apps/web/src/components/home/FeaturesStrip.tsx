"use client";

import { Reveal } from "@/components/motion/Reveal";

const FEATURES = [
  {
    emoji: "🎥",
    title: "Live & interactive",
    description:
      "Small groups with a real instructor — not pre-recorded videos kids watch alone.",
  },
  {
    emoji: "🧩",
    title: "Scratch projects",
    description:
      "Every level ends with something your child built and can show off at home.",
  },
  {
    emoji: "🗣️",
    title: "Bangla or English",
    description:
      "Pick the language that helps your child understand and enjoy each session.",
  },
  {
    emoji: "📈",
    title: "Age-matched tracks",
    description:
      "Separate paths for ages 6–8, 9–11, and 12–14 so the pace always fits.",
  },
] as const;

export function FeaturesStrip() {
  return (
    <section
      className="relative border-b border-border bg-surface py-12 sm:py-14"
      aria-label="Why BrainStack"
    >
      <div className="site-container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.08}>
            <div className="group text-center sm:text-left">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-brand-green/10 text-2xl transition-transform group-hover:scale-110 dark:bg-brand-green/20"
              >
                {feature.emoji}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-content">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-muted">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
