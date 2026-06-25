"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const ADMISSION_STEPS = [
  {
    step: 1,
    emoji: "📝",
    title: "Register your interest",
    description: "Fill in the trial form with your child's age and preferred class time.",
  },
  {
    step: 2,
    emoji: "🎥",
    title: "Join a free trial",
    description: "Your child attends one live session — no payment — so you see how we teach.",
  },
  {
    step: 3,
    emoji: "📞",
    title: "We follow up",
    description: "Our team confirms the right track, answers questions, and suggests a start date.",
  },
  {
    step: 4,
    emoji: "🎒",
    title: "Enroll in your plan",
    description: "Choose monthly or full level. We send enrollment details when you're ready.",
  },
] as const;

export function AdmissionProcessSection() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="admission-heading">
      <div className="site-container">
        <SectionHeader
          id="admission-heading"
          eyebrow="How joining works"
          title={
            <>
              From first click to{" "}
              <span className="gradient-text">first class</span>
            </>
          }
          description="The same simple process for every track — start with a trial, then decide when you're ready."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {ADMISSION_STEPS.map((item) => (
            <StaggerItem key={item.step}>
              <GlassCard className="flex h-full flex-col p-6 text-center sm:text-left">
                <span aria-hidden="true" className="text-3xl">
                  {item.emoji}
                </span>
                <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-content">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-content-muted">{item.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 text-center">
          <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-8">
            Start with a free trial
          </Link>
        </div>
      </div>
    </section>
  );
}
