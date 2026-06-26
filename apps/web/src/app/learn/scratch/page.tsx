import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

export const metadata: Metadata = {
  title: "Scratch Playground | BrainStack",
  description:
    "Practice Scratch coding in the BrainStack playground — build projects and test your understanding.",
};

export default function ScratchPlaygroundPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <AnimatedBackground variant="minimal" />

        <div className="site-container relative">
          <div className="max-w-3xl">
            <p className="eyebrow">Scratch playground</p>
            <h1 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Build &amp; test your{" "}
              <span className="gradient-text">Scratch projects</span>
            </h1>
            <p className="mt-4 text-content-muted">
              An embedded Scratch environment will live here so students can practice
              blocks, loops, and logic after each lesson. Coming soon — integrated
              with course progress and gamification.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <div className="flex items-center gap-2 border-b border-border bg-surface-muted/50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-brand-green-light" />
              <span className="ml-2 font-mono text-xs text-content-faint">
                scratch.brainstack.studio
              </span>
            </div>
            <div className="flex aspect-[16/10] flex-col items-center justify-center gap-4 bg-brand-green-dark/5 p-8 text-center">
              <span className="text-5xl">🐱</span>
              <p className="font-display text-lg font-bold text-content">
                Scratch editor integration coming soon
              </p>
              <p className="max-w-md text-sm text-content-muted">
                This will embed the Scratch VM or link to MIT Scratch with
                BrainStack project templates and assignment checkpoints.
              </p>
              <Link href="/onboarding" className="btn-secondary mt-2">
                Back to onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
