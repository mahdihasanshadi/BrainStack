"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    period: "trial class",
    description:
      "One live class so your child can experience BrainStack — meet the instructor, try Scratch, and see how we teach.",
    features: [
      "1 FREE trial class",
      "45-minute live session",
      "Age-appropriate activity",
      "Parent Q&A included",
      "No admission fees",
    ],
    cta: { href: TRIAL_REGISTRATION_PATH, label: "Book free trial" },
    highlighted: false,
  },
  {
    name: "Group",
    price: "৳2,500",
    period: "/ month",
    description:
      "Two weekly live classes in your child's age track, with homework check-ins and project feedback.",
    features: [
      "2 weekly live classes",
      "Maximum 15 students",
      "Class recordings provided",
      "Scratch projects to keep",
      "Bangla or English",
    ],
    cta: { href: TRIAL_REGISTRATION_PATH, label: "Start with trial" },
    highlighted: true,
  },
  {
    name: "One-on-One",
    price: "৳7,000",
    period: "/ month",
    description:
      "Private sessions with a dedicated instructor — ideal for focused learners who want personalized attention.",
    features: [
      "2 weekly 1:1 sessions",
      "Fully personalized pace",
      "Class recordings provided",
      "Progress reports",
      "No admission fees",
    ],
    cta: { href: "/contact", label: "Talk to us" },
    highlighted: false,
  },
] as const;

export function PricingSection() {
  return (
    <section
      className="relative bg-surface-muted/30 py-24 sm:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="pricing-heading"
          eyebrow="Pricing & plans"
          title={
            <>
              Our{" "}
              <span className="gradient-text">pricing plans</span>
            </>
          }
          description="Transparent pricing in BDT — inspired by the best local academies. Book a free trial first, no payment required."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {TIERS.map((tier) => (
            <StaggerItem key={tier.name}>
              <GlassCard
                className={`relative flex h-full flex-col overflow-hidden p-8 ${
                  tier.highlighted
                    ? "ring-2 ring-brand-green/40 lg:-translate-y-3 motion-reduce:lg:translate-y-0"
                    : ""
                }`}
              >
                {tier.highlighted ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-brand"
                  />
                ) : null}

                {tier.highlighted ? (
                  <span className="mb-4 inline-flex w-fit rounded-pill bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-green dark:text-brand-yellow-light">
                    Most popular
                  </span>
                ) : (
                  <span className="mb-4 block h-6" />
                )}

                <h3 className="font-display text-xl font-bold text-content">{tier.name}</h3>
                <p className="mt-3 font-display text-4xl font-extrabold text-content">
                  {tier.price}
                  <span className="ml-1 text-sm font-medium text-content-muted">
                    {tier.period}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-content-muted">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-content">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green dark:bg-brand-yellow/15 dark:text-brand-yellow-light"
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.cta.href}
                  className={`mt-8 w-full justify-center ${
                    tier.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {tier.cta.label}
                </Link>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
