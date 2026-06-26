"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const STEPS = [
  {
    step: "01",
    emoji: "📋",
    title: "Book a free trial",
    description:
      "Fill a quick form with your child's age and preferred language. Pick a live class slot that fits your schedule.",
  },
  {
    step: "02",
    emoji: "🎥",
    title: "Join a live class",
    description:
      "Your child meets their instructor, tries Scratch, and builds something fun — all in a safe, small-group session.",
  },
  {
    step: "03",
    emoji: "🧩",
    title: "Build real projects",
    description:
      "Every week brings a new challenge — games, animations, and stories your child creates and proudly shares.",
  },
  {
    step: "04",
    emoji: "🚀",
    title: "Grow with confidence",
    description:
      "Progress through age-matched levels with clear milestones, parent updates, and a portfolio of finished work.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="how-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-green/[0.03] to-transparent"
      />

      <div className="site-container relative">
        <SectionHeader
          id="how-heading"
          eyebrow="How it works"
          title={
            <>
              From curious to{" "}
              <span className="gradient-text">confident coder</span>
            </>
          }
          description="Four simple steps — inspired by the best live coding platforms, built for Bangladeshi families."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((item, index) => (
            <StaggerItem key={item.step}>
              <div className="group relative h-full">
                {index < STEPS.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-[calc(50%+2rem)] top-10 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-brand-green/40 to-brand-yellow/40 lg:block"
                  />
                ) : null}

                <div className="glass-card h-full p-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-2xl shadow-glow">
                      {item.emoji}
                    </span>
                    <span className="font-display text-3xl font-extrabold text-brand-green/15 dark:text-brand-yellow/20">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-content">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-14 text-center">
          <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-8 py-4 text-base">
            Start with a free trial
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
