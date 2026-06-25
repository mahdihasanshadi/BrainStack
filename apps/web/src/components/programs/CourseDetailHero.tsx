"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import type { CourseDetail } from "@/lib/api";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

interface CourseDetailHeroProps {
  course: CourseDetail;
}

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <AnimatedBackground variant="hero" />

      <div className="site-container relative">
        <Link
          href="/#courses"
          className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-semibold text-brand-green transition-colors hover:bg-surface-glass dark:text-brand-yellow-light"
        >
          <span aria-hidden="true">←</span> All programs
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-3xl"
        >
          <p className="eyebrow">
            Ages {course.ageMin}–{course.ageMax} · {course.durationMonths}-month track
          </p>
          <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
            {course.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-content-muted">
            {course.shortDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-8">
              Book free trial
            </Link>
            <a href="#levels" className="btn-secondary px-8">
              See levels
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
