"use client";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const REASONS = [
  {
    emoji: "👩‍🏫",
    title: "World-class live instructors",
    points: ["Top 1% teaching talent", "Interactive, not passive", "Every child gets attention"],
  },
  {
    emoji: "📚",
    title: "Future-ready curriculum",
    points: ["Age-matched learning paths", "Scratch to advanced logic", "Project-based progression"],
  },
  {
    emoji: "🎯",
    title: "Real outcomes, not worksheets",
    points: ["Portfolio-worthy projects", "Visible skill progression", "Confidence that compounds"],
  },
  {
    emoji: "🤝",
    title: "Parents stay informed",
    points: ["Free trial before commitment", "Clear progress updates", "Honest guidance always"],
  },
  {
    emoji: "🌏",
    title: "Global quality, local heart",
    points: ["Built for Bangladeshi families", "Bangla or English classes", "Schedules that work"],
  },
  {
    emoji: "🔒",
    title: "Safe & trustworthy",
    points: ["Kid-safe online environment", "Verified instructors", "Transparent pricing"],
  },
] as const;

export function WhyChooseSection() {
  return (
    <section
      className="relative bg-surface-muted/30 py-24 sm:py-32"
      aria-labelledby="why-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="why-heading"
          eyebrow="Why BrainStack"
          title={
            <>
              Shaping tomorrow&apos;s{" "}
              <span className="gradient-text">innovators</span>
            </>
          }
          description="We combine premium live teaching, research-backed curriculum, and a playful classroom energy — so kids fall in love with learning."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {REASONS.map((reason) => (
            <StaggerItem key={reason.title}>
              <GlassCard className="h-full p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-2xl dark:bg-brand-green/20">
                  {reason.emoji}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-content">
                  {reason.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {reason.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-content-muted">
                      <span className="font-bold text-brand-yellow">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
