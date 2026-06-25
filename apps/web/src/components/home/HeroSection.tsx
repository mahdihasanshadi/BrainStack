"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import {
  COURSES_SECTION_ID,
  TRIAL_REGISTRATION_PATH,
} from "@/components/layout/nav-links";
import { HeroVisual } from "./HeroVisual";

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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Future-ready coding education
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 font-display text-hero-sm font-extrabold tracking-tight sm:text-hero"
          >
            Building the{" "}
            <span className="gradient-text">next generation</span> of creators
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-content-muted sm:text-xl"
          >
            BrainStack is a premium live coding platform where curious kids learn
            Scratch, logic, and creative problem-solving — with instructors who
            make every class feel like an adventure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-8 py-4 text-base">
              Start free trial
              <span aria-hidden="true">→</span>
            </Link>
            <a href={`#${COURSES_SECTION_ID}`} className="btn-secondary px-8 py-4 text-base">
              Explore programs
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6"
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
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
