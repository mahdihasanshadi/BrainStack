"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { AccentText } from "@/components/ui/AccentText";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

export function FinalCtaBanner() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="final-cta-heading"
    >
      <AnimatedBackground variant="hero" showStars />

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-border mx-auto max-w-4xl"
        >
          <div className="gradient-border-inner px-8 py-16 text-center sm:px-16 sm:py-20">
            <p className="eyebrow mx-auto">Start your journey</p>
            <h2
              id="final-cta-heading"
              className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section"
            >
              Book a free class to start your kid&apos;s{" "}
              <span className="gradient-text">
                <AccentText>coding journey</AccentText>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-content-muted">
              Join BrainStack with a completely free trial class. No payment,
              no commitment — just one session to see the magic happen.
            </p>
            <Link
              href={TRIAL_REGISTRATION_PATH}
              className="btn-primary mt-10 px-10 py-4 text-base"
            >
              Book FREE trial class
              <span aria-hidden="true">→</span>
            </Link>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-content-muted">
              <li className="flex items-center gap-2">
                <span className="text-brand-green">✓</span> No payment required
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green">✓</span> Ages 6–14
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green">✓</span> Bangla or English
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-green">✓</span> Live instructors
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
