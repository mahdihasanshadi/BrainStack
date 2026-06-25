"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CourseSummary } from "@/lib/api";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const THEMES = [
  { gradient: "from-brand-green to-brand-green-dark", emoji: "🌱" },
  { gradient: "from-brand-green-dark to-brand-yellow-light", emoji: "🚀" },
  { gradient: "from-brand-yellow-light to-brand-yellow", emoji: "⭐" },
] as const;

interface CourseCardProps {
  course: CourseSummary;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const theme = THEMES[index % THEMES.length];

  return (
    <motion.article
      className="glass-card group flex h-full flex-col overflow-hidden"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative bg-gradient-to-r px-6 py-8 ${theme.gradient}`}
        aria-hidden="true"
      >
        <div className="flex items-start justify-between">
          <span className="text-4xl">{theme.emoji}</span>
          <span className="rounded-pill bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Ages {course.ageMin}–{course.ageMax}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-bold text-content">{course.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-content-muted">
          {course.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-5 text-xs font-medium text-content-faint">
          <span>📅 {course.durationMonths}-month track</span>
          <span>🎥 Live classes</span>
          <span>🧩 Scratch projects</span>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/programs/${course.slug}`}
            className="btn-secondary flex-1 justify-center py-2.5 text-sm"
          >
            View program
          </Link>
          <Link
            href={TRIAL_REGISTRATION_PATH}
            className="btn-primary flex-1 justify-center py-2.5 text-sm"
          >
            Enroll now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
