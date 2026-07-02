"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { AccentText } from "@/components/ui/AccentText";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { getLogoAccent } from "@/lib/logo-accents";
import { PARENT_MEETING_PATH, TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const STEPS = [
  {
    step: "01",
    title: "Parent meeting",
    description: "Join our free monthly live session — ask anything before you commit.",
    href: PARENT_MEETING_PATH,
    cta: "Register free",
    accent: 1,
  },
  {
    step: "02",
    title: "Trial class",
    description: "Your child tries a real lesson with a live instructor — no payment yet.",
    href: TRIAL_REGISTRATION_PATH,
    cta: "Book trial",
    accent: 0,
  },
  {
    step: "03",
    title: "Enroll & build",
    description: "Unlock 20 live classes, recordings, badges, and BD-themed game projects.",
    href: "#courses",
    cta: "See course",
    accent: 2,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <AnimatedBackground variant="section" />
      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <LogoColorStrip size="md" className="mx-auto mb-8 max-w-xs" />
          <h2 className="font-display text-section-sm font-extrabold tracking-tight sm:text-section">
            How it <AccentText>works</AccentText>
          </h2>
          <p className="mt-4 text-lg text-content-muted">
            Three simple steps — parent-first, kid-approved.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {STEPS.map((item, index) => {
            const accent = getLogoAccent(item.accent);
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card relative overflow-hidden border p-8 ${accent.cardBorder}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 ${accent.cardGradient}`}
                />
                <div className="relative">
                  <span
                    className={`font-display text-5xl font-extrabold opacity-90 ${accent.stat}`}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-content">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">{item.description}</p>
                  <Link
                    href={item.href}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-bold transition-opacity hover:opacity-80 ${accent.check}`}
                  >
                    {item.cta} →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
