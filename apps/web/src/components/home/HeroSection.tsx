"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { AccentText } from "@/components/ui/AccentText";
import { HeroVideo } from "@/components/home/HeroVideo";
import {
  COURSES_SECTION_ID,
  PARENT_MEETING_PATH,
  TRIAL_REGISTRATION_PATH,
} from "@/components/layout/nav-links";

const TRUST = [
  { label: "Kid-safe platform", icon: "🛡️" },
  { label: "Live instructors", icon: "👩‍🏫" },
  { label: "Ages 6–14", icon: "✨" },
  { label: "Bangla & English", icon: "🌍" },
] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <AnimatedBackground variant="hero" showStars />

      <div className="site-container relative grid gap-16 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <p className="eyebrow">For parents &amp; curious kids</p>
            <span className="hidden rounded-pill bg-brand-yellow/15 px-3 py-1 text-xs font-bold text-brand-yellow-dark dark:text-brand-yellow-light sm:inline-flex">
              🇧🇩 Built for Bangladesh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 font-display text-hero-sm font-extrabold tracking-tight sm:text-hero"
          >
            Minimal. Intuitive.{" "}
            <span className="gradient-text">
              <AccentText>Future-ready</AccentText>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-content-muted sm:text-xl"
          >
            BrainStack teaches logical reasoning and Scratch through live weekly
            classes, pre-recorded lessons, and gamified projects — designed to
            attract both kids and parents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Link href={PARENT_MEETING_PATH} className="btn-primary px-8 py-4 text-base">
              Free parent meeting
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={TRIAL_REGISTRATION_PATH} className="btn-secondary px-8 py-4 text-base">
              Book trial class
            </Link>
            <a href={`#${COURSES_SECTION_ID}`} className="btn-ghost px-4 py-4 text-base">
              View course →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10 p-4"
          >
            <p className="text-sm font-bold text-content">
              Parents: register with email &amp; phone for our monthly live meeting
            </p>
            <p className="mt-1 text-xs text-content-muted">
              Q&amp;A included · Why coding matters · How we teach · No payment required
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6"
          >
            {TRUST.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 text-sm font-medium text-content-muted"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-glass text-base backdrop-blur-sm"
                >
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVideo />
        </motion.div>
      </div>
    </section>
  );
}
