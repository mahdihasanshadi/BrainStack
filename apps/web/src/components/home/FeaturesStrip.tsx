"use client";

import { motion } from "framer-motion";
import { getLogoAccent } from "@/lib/logo-accents";

const FEATURES = [
  { icon: "🎮", label: "Gamified learning" },
  { icon: "📹", label: "Live + recorded" },
  { icon: "🏆", label: "Badges & streaks" },
  { icon: "👨‍👩‍👧", label: "Parent dashboard" },
  { icon: "🇧🇩", label: "BD-themed projects" },
  { icon: "🧠", label: "Logic-first curriculum" },
] as const;

export function FeaturesStrip() {
  return (
    <section className="border-b border-border bg-surface/50 py-8">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {FEATURES.map((feature, index) => {
            const accent = getLogoAccent(index);
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg backdrop-blur-sm ${accent.iconWrap}`}
                >
                  {feature.icon}
                </span>
                <span className="text-sm font-semibold text-content">{feature.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
