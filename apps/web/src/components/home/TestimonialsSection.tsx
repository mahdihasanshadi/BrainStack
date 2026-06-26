"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    quote:
      "What amazed me was my daughter's interest in coding — she can't wait for weekends. The teacher has a proper curriculum and plan. I highly recommend this course.",
    name: "Sunny Ismail",
    detail: "Father of Ayesha · UK",
    rating: 5,
  },
  {
    quote:
      "The Bangla instruction option made all the difference. Sessions feel like play, not homework — but she's learning real Scratch skills every week.",
    name: "Shirin",
    detail: "Mother of Farhan · USA",
    rating: 5,
  },
  {
    quote:
      "We booked the trial first. After one class we knew the pace was right — he kept working on his project for hours after class ended.",
    name: "Amreen Haq",
    detail: "Mother of Affan · Australia",
    rating: 5,
  },
  {
    quote:
      "Small group size matters. The instructor noticed when my child was stuck and guided them through patiently. Mastery learning at its best.",
    name: "Sharmin Akter",
    detail: "Mother of Mahdi · Bangladesh",
    rating: 5,
  },
  {
    quote:
      "My daughter finally understood what a loop does — she explained it using a Scratch cat animation she built herself. Pure joy to watch.",
    name: "Parent in Dhaka",
    detail: "Child age 9 · Track 2",
    rating: 5,
  },
] as const;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const current = TESTIMONIALS[active];

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="testimonials-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-yellow/[0.03] to-transparent"
      />

      <div className="site-container relative">
        <SectionHeader
          id="testimonials-heading"
          eyebrow="Family stories"
          title={
            <>
              What parents are{" "}
              <span className="gradient-text">saying about us</span>
            </>
          }
          description="Real feedback from families exploring BrainStack — the same trust that powers top coding academies worldwide."
          align="center"
        />

        <div
          className="mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <GlassCard className="relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 text-[8rem] leading-none text-brand-green/5 dark:text-brand-yellow/5"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div aria-hidden="true" className="flex gap-0.5 text-brand-yellow">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-content sm:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-base font-bold text-white">
                    {current.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-content">{current.name}</p>
                    <p className="text-sm text-content-faint">{current.detail}</p>
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-pill transition-all ${
                      i === active
                        ? "w-8 bg-brand-green dark:bg-brand-yellow-light"
                        : "w-2 bg-border hover:bg-brand-green/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-glass text-content-muted transition-colors hover:border-brand-green/40 hover:text-brand-green"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-glass text-content-muted transition-colors hover:border-brand-green/40 hover:text-brand-green"
                >
                  →
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-border bg-surface-muted/50 p-5 text-sm text-content-muted"
            >
              <p className="line-clamp-3">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-3 font-display text-xs font-semibold text-content">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
