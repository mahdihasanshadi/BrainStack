"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PARENT_MEETING_PATH } from "@/components/layout/nav-links";

export function ParentMeetingBanner() {
  return (
    <section
      className="relative overflow-hidden border-y border-brand-yellow/30 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-dark py-10 text-white dark:from-[#071510] dark:via-brand-green-dark dark:to-[#071510]"
      aria-labelledby="parent-meeting-banner"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(234,179,8,0.15),transparent_50%)]"
      />

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
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
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
