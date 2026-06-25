"use client";

import type { CourseLevel } from "@/lib/api";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CourseLevelsSectionProps {
  levels: CourseLevel[];
}

const LEVEL_GRADIENTS = [
  "from-brand-green to-brand-green-dark",
  "from-brand-green-dark to-brand-yellow-light",
  "from-brand-yellow-light to-brand-yellow",
  "from-brand-yellow to-brand-green",
] as const;

export function CourseLevelsSection({ levels }: CourseLevelsSectionProps) {
  const orderedLevels = [...levels].sort(
    (a, b) => a.levelNumber - b.levelNumber,
  );

  return (
    <section
      id="levels"
      className="scroll-mt-28 bg-surface-muted/30 py-24 sm:py-32"
      aria-labelledby="levels-heading"
    >
      <div className="site-container">
        <SectionHeader
          id="levels-heading"
          eyebrow="Curriculum"
          title={
            <>
              Level by level{" "}
              <span className="gradient-text">progression</span>
            </>
          }
          description="Each level builds on the last — live classes, weekly practice, and a finished project before moving forward."
        />

        <Stagger className="mt-16 space-y-6" stagger={0.1}>
          {orderedLevels.map((level, index) => {
            const gradient = LEVEL_GRADIENTS[index % LEVEL_GRADIENTS.length];

            return (
              <StaggerItem key={level.id}>
                <GlassCard hover={false} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div
                      className={`flex shrink-0 items-center justify-center bg-gradient-to-br px-8 py-6 sm:w-40 sm:flex-col sm:py-10 ${gradient}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                        Level
                      </span>
                      <span className="font-display text-5xl font-extrabold text-white">
                        {level.levelNumber}
                      </span>
                    </div>

                    <div className="flex-1 p-6 sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-brand-yellow-light">
                        {level.durationMonths} months · {level.toolName}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold text-content">
                        {level.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-content-muted">
                        {level.description}
                      </p>

                      <div className="mt-5 rounded-xl border border-border bg-surface-muted/50 px-4 py-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-content-muted">
                          By the end of this level
                        </p>
                        <p className="mt-2 text-sm text-content">{level.finalOutcome}</p>
                      </div>

                      {level.learningOutcomes.length > 0 ? (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {level.learningOutcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-sm text-content-muted">
                              <span className="font-bold text-brand-yellow">✓</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
