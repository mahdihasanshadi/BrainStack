"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CourseSummary } from "@/lib/api";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { getLogoAccent } from "@/lib/logo-accents";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const GAME_PREVIEWS = [
  { emoji: "🏎️", title: "Dhaka Street Race", month: "Month 1" },
  { emoji: "🍡", title: "Fuchka Clicker Survival", month: "Month 2" },
  { emoji: "🏏", title: "BD Cricket Championship", month: "Month 3" },
  { emoji: "🚀", title: "Your Original BD Game", month: "Month 4" },
];

const HIGHLIGHTS = [
  { icon: "🎮", label: "20 live + recorded classes" },
  { icon: "🏅", label: "4 monthly showcase days" },
  { icon: "💎", label: "Gems, badges & streaks" },
  { icon: "🌐", label: "Bangla & English" },
  { icon: "📱", label: "Weekly parent reports" },
  { icon: "🎓", label: "Certificate of completion" },
];

interface CourseCardProps {
  course: CourseSummary;
  index?: number;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-brand-green/30 bg-brand-green-dark shadow-[0_0_80px_rgba(56,147,244,0.12)]"
    >
      <LogoColorStrip size="sm" className="rounded-none" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
        {/* ── LEFT: Course info ── */}
        <div className="p-8 sm:p-10">
          {/* Badges */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-pill border border-brand-pink/40 bg-brand-pink/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-pink-light">
              {"🇧🇩 Bangladesh's #1 Kids Coding Course"}
            </span>
            <span className="rounded-pill border border-brand-yellow/35 bg-brand-yellow/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
              Ages {course.ageMin}–{course.ageMax}
            </span>
            <span className="rounded-pill border border-brand-green/40 bg-brand-green/15 px-3 py-1 text-xs font-bold text-brand-green-light">
              ✅ Enrolling Now
            </span>
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Junior Game Dev:{" "}
            <span className="gradient-text">Scratch & Logic</span>
          </h3>

          <p className="mt-3 text-base leading-relaxed text-slate-200">
            {course.shortDescription}
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-1 font-bold text-yellow-400">
              ★★★★★ <span className="text-slate-300 font-normal ml-1">4.9 (127 reviews)</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-300">500+ students</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-300">{course.durationMonths} months</span>
          </div>

          {/* Highlights grid */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, index) => {
              const accent = getLogoAccent(index);
              return (
                <div
                  key={h.label}
                  className={`flex items-center gap-2 rounded-xl border bg-white/5 px-3 py-2.5 ${accent.cardBorder}`}
                >
                  <span className="text-base">{h.icon}</span>
                  <span className="text-xs font-medium text-slate-200">{h.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/programs/${course.slug}`}
              className="btn-primary px-8 py-3.5 text-base text-center"
            >
              🚀 Explore Full Course
            </Link>
            <Link
              href={TRIAL_REGISTRATION_PATH}
              className="btn-secondary-coral px-7 py-3.5 text-base text-center"
            >
              Book Free Trial
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Games preview panel ── */}
        <div className="border-t border-brand-green/20 bg-white/5 p-8 lg:border-l lg:border-t-0">
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
            4 games your child will build 🎮
          </p>

          <div className="space-y-3">
            {GAME_PREVIEWS.map((game, i) => {
              const accent = getLogoAccent(i);
              return (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className={`flex items-center gap-3 rounded-xl border bg-white/5 p-3 ${accent.cardBorder}`}
                >
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border text-xl backdrop-blur-sm ${accent.iconWrap}`}
                  >
                    {game.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{game.title}</p>
                    <p className="text-xs text-slate-400">{game.month}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-brand-yellow/35 bg-brand-yellow/10 p-4 text-center">
            <p className="text-xs text-slate-300 mb-1">Full 4-month flagship course</p>
            <p className="font-display text-lg font-extrabold text-white">
              See pricing on the course page
            </p>
            <p className="mt-2 text-xs text-slate-400">
              bKash · Nagad · Visa · Mastercard accepted at checkout
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
