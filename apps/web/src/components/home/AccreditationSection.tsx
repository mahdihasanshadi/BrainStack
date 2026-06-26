"use client";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const BADGES = [
  { label: "STEM.org", sub: "Accredited curriculum" },
  { label: "Project-Based", sub: "Learning approach" },
  { label: "Live Classes", sub: "Not pre-recorded" },
  { label: "Small Batches", sub: "Max 15 students" },
] as const;

const HIGHLIGHTS = [
  {
    icon: "📚",
    title: "Comprehensive curriculum",
    text: "Age-matched tracks from Scratch basics to advanced logic — designed by educators, not generic templates.",
  },
  {
    icon: "👩‍🏫",
    title: "Skilled instructors",
    text: "Patient, trained teachers who adapt to each child's pace and make every session feel like play.",
  },
  {
    icon: "🎯",
    title: "Project-based learning",
    text: "Kids build games, animations, and stories they can show off — real skills, not worksheets.",
  },
  {
    icon: "🤝",
    title: "Parent partnership",
    text: "Free trial first, clear progress updates, and honest guidance so you always know how your child is doing.",
  },
] as const;

export function AccreditationSection() {
  return (
    <section
      className="relative border-y border-border bg-surface-muted/40 py-24 sm:py-32"
      aria-labelledby="accreditation-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="accreditation-heading"
          eyebrow="Trusted quality"
          title={
            <>
              Bangladesh&apos;s premium{" "}
              <span className="gradient-text">live coding platform</span>
            </>
          }
          description="The same pillars that power top global platforms — STEM-aligned curriculum, live instruction, and outcomes parents can see."
          align="center"
        />

        <Stagger
          className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          stagger={0.08}
        >
          {BADGES.map((badge) => (
            <StaggerItem key={badge.label}>
              <div className="flex min-w-[140px] flex-col items-center rounded-2xl border border-border bg-surface-glass px-6 py-5 text-center shadow-glass backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-card">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-brand-green dark:text-brand-yellow-light">
                  {badge.label}
                </span>
                <span className="mt-1 text-xs text-content-faint">{badge.sub}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {HIGHLIGHTS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:border-brand-green/30 hover:shadow-card">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 font-display text-base font-bold text-content">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-content-muted">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
