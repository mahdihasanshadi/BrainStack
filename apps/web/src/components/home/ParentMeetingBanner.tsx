"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { PARENT_MEETING_PATH } from "@/components/layout/nav-links";

export function ParentMeetingBanner() {
  return (
    <section
      className="relative overflow-hidden border-y border-border bg-brand-green-dark py-10 text-white"
      aria-labelledby="parent-meeting-banner"
    >
      <LogoColorStrip size="sm" className="absolute inset-x-0 top-0 rounded-none" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-pink/18" />
        <div className="absolute inset-y-0 left-1/3 w-1/3 bg-brand-green/18" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-brand-yellow/18" />
      </div>

      <div className="site-container relative flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
            Most important · Free registration
          </p>
          <h2
            id="parent-meeting-banner"
            className="mt-2 font-display text-2xl font-extrabold sm:text-3xl"
          >
            Monthly Parent Live Meeting
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Register with your email and phone. Every month we explain why coding
            matters, how our courses work, and answer all your questions in a live
            Q&amp;A — completely free.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={PARENT_MEETING_PATH}
            className="inline-flex items-center gap-2 rounded-pill bg-brand-yellow px-8 py-4 font-display text-base font-bold text-brand-green-dark shadow-float transition-shadow hover:shadow-glow-yellow"
          >
            Register for parents — free
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
