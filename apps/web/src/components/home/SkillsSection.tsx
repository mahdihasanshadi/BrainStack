"use client";

import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COURSES_SECTION_ID } from "@/components/layout/nav-links";

const SKILLS = [
  {
    emoji: "🧩",
    title: "Scratch Coding",
    tagline: "Create with logic",
    description: "Build games, animations, and stories through visual programming blocks.",
    gradient: "from-brand-green/20 to-brand-green-dark/10",
    href: `#${COURSES_SECTION_ID}`,
  },
  {
    emoji: "🧠",
    title: "Computational Thinking",
    tagline: "Think like a builder",
    description: "Loops, conditions, and debugging — skills that transfer to any future field.",
    gradient: "from-brand-green-dark/20 to-brand-yellow-light/10",
    href: `#${COURSES_SECTION_ID}`,
  },
  {
    emoji: "🎥",
    title: "Live Instruction",
    tagline: "Learn together",
    description: "Small groups with instructors who adapt to each child's pace and personality.",
    gradient: "from-brand-yellow-light/20 to-brand-yellow/10",
    href: "/how-it-works",
  },
  {
    emoji: "🚀",
    title: "Project Portfolio",
    tagline: "Build to showcase",
    description: "Every level ends with a project your child created and can proudly share.",
    gradient: "from-brand-yellow/20 to-brand-green/10",
    href: `#${COURSES_SECTION_ID}`,
  },
] as const;

export function SkillsSection() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="skills-heading">
      <AnimatedBackground variant="section" />

      <div className="site-container relative">
        <SectionHeader
          id="skills-heading"
          eyebrow="Skills for success"
          title={
            <>
              Programs that build{" "}
              <span className="gradient-text">confidence & creativity</span>
            </>
          }
          description="High-impact learning paths designed to turn curiosity into real capability — the kind of skills that last a lifetime."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {SKILLS.map((skill) => (
            <StaggerItem key={skill.title}>
              <Link href={skill.href} className="block h-full">
                <GlassCard className={`h-full bg-gradient-to-br p-7 ${skill.gradient}`}>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-glass text-2xl backdrop-blur-xl">
                    {skill.emoji}
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-green dark:text-brand-yellow-light">
                    {skill.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-content">
                    {skill.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">
                    {skill.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-green dark:text-brand-yellow-light">
                    Explore
                    <span aria-hidden="true">→</span>
                  </span>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
