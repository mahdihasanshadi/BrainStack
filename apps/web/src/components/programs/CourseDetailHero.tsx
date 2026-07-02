"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CourseDetail } from "@/lib/api";
import { formatBdt, getEffectivePrice } from "@/lib/course-pricing";
import { PARENT_MEETING_PATH, TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const SKILLS = [
  { emoji: "🧠", label: "Logical Thinking" },
  { emoji: "🎮", label: "Game Design" },
  { emoji: "🔁", label: "Loops & Variables" },
  { emoji: "🐛", label: "Debugging" },
  { emoji: "🎨", label: "Creative Coding" },
  { emoji: "🏗️", label: "Structured Thinking" },
  { emoji: "🤝", label: "Problem Solving" },
  { emoji: "🚀", label: "Independent Dev" },
];

const INCLUDED = [
  "20 live + pre-recorded classes",
  "4 complete BD-themed games built",
  "Monthly parent showcase events",
  "Lifetime recording access",
  "WhatsApp parent community",
  "Certificate of completion",
  "Weekly coding challenges",
  "💎 Gems, badges & XP reward system",
];

function Stars() {
  return <span className="text-yellow-400 tracking-tight">★★★★★</span>;
}

interface CourseDetailHeroProps {
  course: CourseDetail;
}

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  const { original, sale, discountPct } = getEffectivePrice(
    course.priceBdt,
    course.originalPriceBdt,
  );

  return (
    <>
      {/* ── Dark Udemy-style hero ── */}
      <div className="relative overflow-hidden bg-brand-green-dark border-b border-brand-green/20">
        {/* ambient blue glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-60 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-pink/15 blur-[120px]"
        />

        <div className="site-container relative py-10 pb-12 lg:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
            {/* ── LEFT: Course info ── */}
            <div>
              <Link
                href="/programs"
                className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-light transition-colors hover:text-brand-green"
              >
                ← All programs
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                {/* Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-pill border border-brand-green/40 bg-brand-green/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-green-light">
                    {"🇧🇩 Bangladesh's #1 Kids Coding Course"}
                  </span>
                  <span className="rounded-pill border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
                    Ages {course.ageMin}–{course.ageMax}
                  </span>
                  <span className="rounded-pill border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                    ✅ Enrolling Now
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Junior Game Dev:{" "}
                  <span className="gradient-text">Scratch & Logic</span>
                </h1>

                {/* Tagline */}
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">
                  {"Build real Bangladeshi games — Rickshaw Race, Fuchka Clicker, Cricket Championship — while mastering the logical thinking skills that shape tomorrow's problem-solvers."}{" "}
                  <span className="font-semibold text-white">
                    Zero coding experience needed.
                  </span>
                </p>

                {/* Stats row */}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                  <span className="flex items-center gap-1 font-bold text-yellow-400">
                    <Stars /> 4.9
                  </span>
                  <span className="text-slate-300">(127 parent reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">500+ students enrolled</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">
                    🗓 {course.durationMonths} months · 20 classes
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-300">🌐 Bangla &amp; English</span>
                </div>

                {/* Skill pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <span
                      key={s.label}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      {s.emoji} {s.label}
                    </span>
                  ))}
                </div>

                {/* Mobile CTAs */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:hidden">
                  {course.isPurchasable && course.priceBdt > 0 ? (
                    <>
                      <div>
                        <span className="font-display text-3xl font-extrabold text-white">
                          {formatBdt(sale)}
                        </span>
                        <span className="ml-2 text-sm text-slate-400 line-through">
                          {formatBdt(original)}
                        </span>
                        <span className="ml-2 text-xs font-bold text-green-400">
                          {discountPct}% OFF
                        </span>
                      </div>
                      <Link
                        href={`/checkout/${course.slug}`}
                        className="btn-primary text-center text-base"
                      >
                        🚀 Enroll Now
                      </Link>
                    </>
                  ) : null}
                  <Link href={TRIAL_REGISTRATION_PATH} className="btn-secondary text-center">
                    Try a Free Class First
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky purchase card (desktop) ── */}
            <div className="hidden lg:block">
              <PurchaseCard
                course={course}
                originalPrice={original}
                salePrice={sale}
                discountPct={discountPct}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom bar (mobile only) ── */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-brand-green/30 bg-brand-green-dark/96 p-4 backdrop-blur-xl lg:hidden">
        {course.isPurchasable && course.priceBdt > 0 ? (
          <>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-extrabold text-white">
                {formatBdt(sale)}
              </p>
              <p className="text-xs text-slate-400 line-through">
                {formatBdt(original)}
              </p>
            </div>
            <Link
              href={`/checkout/${course.slug}`}
              className="btn-primary flex-shrink-0 px-6 py-3 text-sm"
            >
              Enroll Now
            </Link>
          </>
        ) : (
          <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary w-full py-3 text-center">
            Book Free Trial Class
          </Link>
        )}
      </div>
    </>
  );
}

function PurchaseCard({
  course,
  originalPrice,
  salePrice,
  discountPct,
}: {
  course: CourseDetail;
  originalPrice: number;
  salePrice: number;
  discountPct: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="sticky top-24 overflow-hidden rounded-2xl border border-brand-green/35 bg-surface-muted/95 shadow-[0_0_60px_rgba(56,147,244,0.18)] backdrop-blur-xl dark:bg-brand-green-dark/95"
    >
      {/* Video preview */}
      <div className="relative flex h-44 cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-brand-green-dark via-brand-green-dark to-brand-green/20 group">
        <span className="text-6xl select-none opacity-30">🎮</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green shadow-[0_0_30px_rgba(56,147,244,0.6)] transition-transform group-hover:scale-110">
            <span className="ml-1 text-xl text-white">▶</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-green-dark to-transparent" />
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs font-medium text-slate-300">
          Watch course preview (2 min)
        </p>
      </div>

      <div className="p-5">
        {/* Price */}
        {course.isPurchasable && course.priceBdt > 0 ? (
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-white">
                {formatBdt(salePrice)}
              </span>
              {originalPrice > salePrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatBdt(originalPrice)}
                </span>
              )}
              {discountPct > 0 && (
                <span className="rounded-md border border-green-500/30 bg-green-500/20 px-2 py-0.5 text-xs font-bold text-green-400">
                  {discountPct}% OFF
                </span>
              )}
            </div>
            <p className="mt-1 animate-pulse text-xs font-semibold text-brand-pink">
              ⏰ Only 8 seats left this batch!
            </p>
          </div>
        ) : null}

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          {course.isPurchasable && course.priceBdt > 0 ? (
            <Link
              href={`/checkout/${course.slug}`}
              className="btn-primary w-full py-3.5 text-center text-base"
            >
              🚀 Enroll Now
            </Link>
          ) : null}
          <Link href={TRIAL_REGISTRATION_PATH} className="btn-secondary w-full py-3 text-center">
            Try a Free Class First
          </Link>
          <Link
            href={PARENT_MEETING_PATH}
            className="btn-ghost w-full py-2 text-center text-xs text-slate-300"
          >
            Attend a Parent Info Session →
          </Link>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          30-day money-back guarantee · No questions asked
        </p>

        {/* What's included */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            This course includes:
          </p>
          <ul className="space-y-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                <span className="mt-0.5 flex-shrink-0 font-bold text-brand-green">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment methods */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            Pay with:
          </p>
          <div className="flex flex-wrap gap-2">
            {["bKash", "Nagad", "Visa", "Mastercard", "Rocket"].map((m) => (
              <span
                key={m}
                className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
