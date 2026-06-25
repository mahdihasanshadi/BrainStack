"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const TIERS = [
  {
    name: "Trial Class",
    price: "Free",
    period: "one session",
    description: "One live class so your child can experience BrainStack — meet the instructor, try Scratch, and see how we teach.",
    features: ["45-minute live session", "Age-appropriate activity", "Parent Q&A included"],
    cta: { href: TRIAL_REGISTRATION_PATH, label: "Book free trial" },
    highlighted: false,
  },
  {
    name: "Monthly",
    price: "৳2,500",
    period: "/ month",
    description: "Four weekly live classes in your child's age track, with homework check-ins and project feedback.",
    features: ["4 live classes monthly", "Scratch projects to keep", "Bangla or English"],
    cta: { href: TRIAL_REGISTRATION_PATH, label: "Start with trial" },
    highlighted: true,
  },
  {
    name: "Full Level",
    price: "৳12,000",
    period: "/ level",
    description: "Complete one full level — typically six months of structured lessons and a capstone project.",
    features: ["Full curriculum access", "Progress reports", "Completion certificate"],
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
          eyebrow="Simple pricing"
          title={
            <>
              Start free,{" "}
              <span className="gradient-text">grow at your pace</span>
            </>
          }
          description="Transparent pricing in BDT. Book a free trial first — no payment required to get started."
          align="center"
        />

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {TIERS.map((tier) => (
            <StaggerItem key={tier.name}>
              <GlassCard
                className={`flex h-full flex-col p-8 ${
                  tier.highlighted
                    ? "ring-2 ring-brand-green/30 lg:-translate-y-2 motion-reduce:lg:translate-y-0"
                    : ""
                }`}
              >
                {tier.highlighted ? (
                  <span className="mb-4 inline-flex w-fit rounded-pill bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-green dark:text-brand-yellow-light">
                    Most popular
                  </span>
                ) : (
                  <span className="mb-4 block h-6" />
                )}
                <h3 className="font-display text-xl font-bold text-content">{tier.name}</h3>
                <p className="mt-3 font-display text-3xl font-bold text-content">
                  {tier.price}
                  <span className="ml-1 text-sm font-medium text-content-muted">
                    {tier.period}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm text-content-muted">{tier.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-content">
                      <span className="font-bold text-brand-yellow">✓</span>
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
