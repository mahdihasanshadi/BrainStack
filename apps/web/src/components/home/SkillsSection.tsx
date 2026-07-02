"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { AccentText } from "@/components/ui/AccentText";
import { LogoColorStrip } from "@/components/ui/LogoColorStrip";
import { getLogoAccent } from "@/lib/logo-accents";

const SKILLS = [
  {
    icon: "🧩",
    title: "Logical reasoning",
    description: "Patterns, sequences, and problem-solving before code syntax.",
    accent: 0,
  },
  {
    icon: "🐱",
    title: "Scratch programming",
    description: "Drag-and-drop blocks to build games kids actually want to play.",
    accent: 1,
  },
  {
    icon: "🎯",
    title: "Project-based learning",
    description: "Each month ends with a playable game — cricket, rickshaw, and more.",
    accent: 2,
  },
  {
    icon: "📈",
    title: "Progress tracking",
    description: "Parents see badges, streaks, and class attendance in one place.",
    accent: 0,
  },
] as const;

export function SkillsSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <AnimatedBackground variant="section" />
      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <LogoColorStrip size="md" className="mx-auto mb-8 max-w-xs" />
          <h2 className="font-display text-section-sm font-extrabold tracking-tight sm:text-section">
            Skills that <AccentText>stick</AccentText>
          </h2>
          <p className="mt-4 text-lg text-content-muted">
            Not just coding — we build the thinking habits that last a lifetime.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, index) => {
            const accent = getLogoAccent(skill.accent);
            return (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`glass-card group relative overflow-hidden border p-6 transition-all duration-300 hover:-translate-y-1 ${accent.cardBorder} ${accent.glow}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100 ${accent.cardGradient}`}
                />
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl backdrop-blur-sm ${accent.iconWrap}`}
                  >
                    {skill.icon}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-content">{skill.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted">{skill.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
