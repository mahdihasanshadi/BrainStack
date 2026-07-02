"use client";

import { motion } from "framer-motion";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { getLogoAccent } from "@/lib/logo-accents";

const STATS = [
  { value: "4", label: "Months per course", suffix: "" },
  { value: "20", label: "Live classes", suffix: "+" },
  { value: "6", label: "Kid-friendly age range", suffix: "–14" },
  { value: "100", label: "Parent-first onboarding", suffix: "%" },
] as const;

export function StatsBar() {
  return (
    <section className="relative border-y border-border bg-surface-elevated/80 backdrop-blur-sm">
      <LogoColorStrip size="sm" className="rounded-none" />
      <div className="site-container py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-4">
          {STATS.map((stat, index) => {
            const accent = getLogoAccent(index);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <p className={`font-display text-4xl font-extrabold sm:text-5xl ${accent.stat}`}>
                  {stat.value}
                  <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-sm font-medium text-content-muted">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
