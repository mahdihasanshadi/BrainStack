"use client";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    label: "Why",
    title: "Every child deserves to create",
    body: "We believe coding unlocks creativity, confidence, and future-ready thinking — regardless of background, language, or starting point.",
    accent: "from-brand-green/20 to-brand-green-dark/5",
  },
  {
    label: "What",
    title: "Live, project-based coding education",
    body: "Age-matched Scratch tracks with real instructors, small groups, and a curriculum that turns curiosity into portfolio-worthy projects.",
    accent: "from-brand-yellow-light/20 to-brand-yellow/5",
  },
  {
    label: "How",
    title: "Personalized, supportive, and fun",
    body: "Free trial first, Bangla or English instruction, and mentors who adapt to each child — so learning feels like an adventure, not homework.",
    accent: "from-brand-green-dark/15 to-brand-yellow-light/10",
  },
] as const;

export function MissionSection() {
  return (
    <section
      className="relative overflow-hidden bg-brand-green-dark py-24 text-white sm:py-32"
      aria-labelledby="mission-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.25),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-yellow/10 blur-3xl"
      />

      <div className="site-container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-yellow-light backdrop-blur-sm">
            Our mission
          </p>
          <h2
            id="mission-heading"
            className="mt-6 font-display text-section-sm font-extrabold tracking-tight sm:text-section"
          >
            Empowering the next generation to{" "}
            <AccentText className="text-brand-yellow-light">build</AccentText>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Inspired by global leaders in coding education — tailored for Bangladeshi
            families who want premium quality without compromise.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.label}>
              <div
                className={`h-full rounded-2xl border border-white/10 bg-gradient-to-br ${pillar.accent} p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/5`}
              >
                <span className="inline-flex rounded-pill bg-brand-yellow/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-yellow-light">
                  {pillar.label}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{pillar.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
