"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PARENT_MEETING_PATH,
  TRIAL_REGISTRATION_PATH,
} from "@/components/layout/nav-links";

const BENEFITS = [
  {
    icon: "🎮",
    title: "One complete course",
    description:
      "Junior Game Dev: Scratch & Logic — 4 months, 20 classes, 4 real Bangladeshi games.",
  },
  {
    icon: "🆓",
    title: "Start with a free trial",
    description:
      "Book a trial class first. No payment required until you are ready to enroll.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Built for parents too",
    description:
      "Monthly parent meetings, showcase days, and clear progress updates every week.",
  },
] as const;

export function EnrollCtaSection() {
  return (
    <section
      className="relative bg-surface-muted/30 py-24 sm:py-32"
      aria-labelledby="enroll-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="enroll-heading"
          eyebrow="Get started"
          title={
            <>
              One flagship course.{" "}
              <span className="gradient-text">Start with a free trial.</span>
            </>
          }
          description="We focus on one expertly designed program right now — so every child gets our full attention. Explore the course details, book a free class, or join a parent info session."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {BENEFITS.map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="flex h-full flex-col p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-pink/20 bg-brand-pink/10 text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-content">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">
                  {item.description}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/programs/logical-reasoning-scratch"
            className="btn-primary px-10 py-4 text-base"
          >
            Explore the course
          </Link>
          <Link href={TRIAL_REGISTRATION_PATH} className="btn-secondary px-8 py-4 text-base">
            Book free trial
          </Link>
          <Link href={PARENT_MEETING_PATH} className="btn-ghost px-6 py-4 text-base">
            Parent meeting →
          </Link>
        </div>
      </div>
    </section>
  );
}
