"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { HeroVideo } from "@/components/home/HeroVideo";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { getLogoAccent } from "@/lib/logo-accents";
import {
  COURSES_SECTION_ID,
  PARENT_MEETING_PATH,
  TRIAL_REGISTRATION_PATH,
} from "@/components/layout/nav-links";

const TRUST = [
  { label: "Ages 6–14", icon: "✨" },
  { label: "Live instructors", icon: "👩‍🏫" },
  { label: "Bangla & English", icon: "🌍" },
  { label: "Kid-safe platform", icon: "🛡️" },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground variant="hero" showStars />

      <div className="site-container relative">
        <LogoColorStrip size="sm" className="mt-6 max-w-[9rem]" />

        <div className="grid items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-20">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface-glass px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-content backdrop-blur-sm"
            >
              <span className="inline-flex gap-0.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
              </span>
              Built for Bangladeshi families
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-content sm:text-hero-sm lg:text-[3.25rem]"
            >
              Kids build{" "}
              <span className="text-brand-pink">games</span>, learn{" "}
              <span className="text-brand-green">logic</span>, and parents stay{" "}
              <span className="text-brand-yellow-dark dark:text-brand-yellow-light">
                in the loop
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 text-lg leading-relaxed text-content-muted sm:text-xl"
            >
              Live Scratch classes, gamified projects, and a free parent meeting every
              month — so your child learns to think like a creator, not just memorize.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-8 py-4 text-base">
                Book free trial class
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={PARENT_MEETING_PATH}
                className="btn-secondary-coral px-8 py-4 text-base"
              >
                Free parent meeting
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-4 text-sm text-content-muted"
            >
              No payment required to start.{" "}
              <a
                href={`#${COURSES_SECTION_ID}`}
                className="font-semibold text-brand-green underline-offset-4 hover:underline dark:text-brand-green-light"
              >
                Explore the flagship course →
              </a>
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {TRUST.map((item, index) => {
                const accent = getLogoAccent(index);
                return (
                  <li
                    key={item.label}
                    className={`rounded-2xl border p-3 text-center backdrop-blur-sm ${accent.cardBorder}`}
                    style={{ background: "var(--surface-glass)" }}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <p className="mt-1.5 text-xs font-semibold leading-snug text-content-muted">
                      {item.label}
                    </p>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none lg:pl-4"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(239,93,74,0.22), transparent 45%), radial-gradient(circle at 80% 30%, rgba(56,147,244,0.22), transparent 45%), radial-gradient(circle at 50% 85%, rgba(255,203,60,0.2), transparent 50%)",
              }}
            />
            <HeroVideo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
