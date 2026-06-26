import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { PARENT_MEETING_PATH, TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

export const metadata: Metadata = {
  title: "How It Works | BrainStack",
  description:
    "See how BrainStack works — parent meetings, kid assessment, live classes, pre-recorded lessons, and Scratch projects.",
};

const JOURNEY = [
  {
    step: "1",
    title: "Register for the parent meeting",
    text: "Free monthly sessions where we explain our courses and answer your questions live.",
    href: PARENT_MEETING_PATH,
    cta: "Register free",
  },
  {
    step: "2",
    title: "Try the kid readiness assessment",
    text: "A short quiz to understand your child's logical thinking and course fit.",
    href: "/assessment",
    cta: "Take assessment",
  },
  {
    step: "3",
    title: "Book a trial or purchase the course",
    text: "Experience a live class or enroll directly with bKash, Nagad, or card via Stripe.",
    href: TRIAL_REGISTRATION_PATH,
    cta: "Book trial",
  },
  {
    step: "4",
    title: "Onboard & start learning",
    text: "Welcome video, weekly live sessions, pre-recorded lessons, gamification, and Scratch playground.",
    href: "/onboarding",
    cta: "See onboarding",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />
        <div className="site-container relative max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
            From first question to{" "}
            <span className="gradient-text">confident coder</span>
          </h1>
          <p className="mt-5 text-lg text-content-muted">
            A clear path for parents and kids — minimal steps, maximum clarity.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="site-container grid gap-6 sm:grid-cols-2">
          {JOURNEY.map((item) => (
            <div key={item.step} className="glass-card p-7">
              <span className="font-display text-3xl font-extrabold text-brand-green/20">
                {item.step}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-content">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-content-muted">{item.text}</p>
              <Link href={item.href} className="btn-secondary mt-5 inline-flex text-sm">
                {item.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <HowItWorksSection />
      <ToolsSection />
    </main>
  );
}
