"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

const ONBOARDING_STEPS = [
  {
    emoji: "🎬",
    title: "Welcome video",
    text: "A personal welcome from our team — what to expect, how to join live classes, and tips for parents.",
    status: "ready",
  },
  {
    emoji: "📺",
    title: "Live weekly sessions",
    text: "Join your instructor every week for interactive Scratch lessons in a small group.",
    status: "scheduled",
  },
  {
    emoji: "🎓",
    title: "Pre-recorded lessons",
    text: "Revision videos and module recordings you can replay anytime to practice what you learn.",
    status: "unlocked",
  },
  {
    emoji: "🏆",
    title: "Gamification & badges",
    text: "Earn XP, streaks, and badges as your child completes classes and assignments.",
    status: "active",
  },
  {
    emoji: "🐱",
    title: "Scratch playground",
    text: "Build and test Scratch projects right in your browser.",
    status: "ready",
    href: "/learn/scratch",
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/onboarding");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center">
        <AnimatedBackground variant="minimal" />
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-pink border-t-transparent" />
          <p className="mt-4 text-content-muted">Verifying account credentials...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />

        <div className="site-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto">Welcome aboard, {user.fullName}!</p>
            <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
              Your learning journey{" "}
              <span className="gradient-text">starts here</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-content-muted">
              Watch this quick welcome guide to get set up, meet the curriculum, and prepare for your child&apos;s first class.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="gradient-border">
              <div className="gradient-border-inner overflow-hidden rounded-2xl">
                <div className="relative aspect-video bg-black shadow-glow-hover transition-shadow duration-300">
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-brand-green-dark/80 p-6 text-center text-white backdrop-blur-sm">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-3xl text-white transition-all hover:scale-110 hover:border-brand-pink hover:bg-brand-pink/20"
                        aria-label="Play video"
                      >
                        ▶
                      </button>
                      <p className="font-display text-lg font-bold">
                        Welcome to BrainStack — Parent & Student Guide
                      </p>
                      <p className="max-w-md text-xs text-white/70">
                        Learn how to access assignments, attend weekly live classes, and explore the Scratch programming environment.
                      </p>
                    </div>
                  ) : (
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="BrainStack Welcome Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/dashboard" className="btn-primary px-12 py-4 shadow-glow font-bold text-lg">
              Go to Dashboard & View Classes
            </Link>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-center font-display text-2xl font-bold text-content">
              What&apos;s waiting inside your dashboard
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ONBOARDING_STEPS.map((step) => (
                <div key={step.title} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl">{step.emoji}</span>
                    <h3 className="mt-3 font-display font-bold text-content">{step.title}</h3>
                    <p className="mt-2 text-sm text-content-muted">{step.text}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40">
                    {("href" in step && step.href) ? (
                      <Link href={step.href} className="btn-secondary text-xs px-4 py-2 inline-flex">
                        Open playground →
                      </Link>
                    ) : (
                      <span className="inline-flex rounded-pill bg-brand-pink/10 px-3 py-1 text-xs font-bold uppercase text-brand-pink">
                        {step.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
