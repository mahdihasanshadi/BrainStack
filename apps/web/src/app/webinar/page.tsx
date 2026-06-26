import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { ParentMeetingForm } from "@/components/registration/ParentMeetingForm";

export const metadata: Metadata = {
  title: "Monthly Parent Meeting — Free Registration | BrainStack",
  description:
    "Register for BrainStack's free monthly parent meeting. Learn why coding matters, how our courses work, and get your questions answered live.",
};

const MEETING_TOPICS = [
  {
    emoji: "🎯",
    title: "Why coding for kids?",
    text: "Understand how logical reasoning and Scratch build real-world skills.",
  },
  {
    emoji: "📅",
    title: "How we teach",
    text: "Live weekly sessions, pre-recorded lessons, and gamified progress.",
  },
  {
    emoji: "💬",
    title: "Live Q&A",
    text: "Ask anything — curriculum, pricing, schedules, or your child's readiness.",
  },
] as const;

export default function ParentMeetingPage() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />

        <div className="site-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto">Free for all parents</p>
            <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
              Monthly Parent{" "}
              <span className="gradient-text">Live Meeting</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-content-muted">
              Join us every month online. We explain why our courses matter, how
              live and recorded classes work, and answer every question in a
              dedicated Q&amp;A session.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {MEETING_TOPICS.map((topic) => (
                  <div
                    key={topic.title}
                    className="glass-card flex gap-4 p-5"
                  >
                    <span className="text-2xl">{topic.emoji}</span>
                    <div>
                      <h2 className="font-display font-bold text-content">{topic.title}</h2>
                      <p className="mt-1 text-sm text-content-muted">{topic.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10 p-5">
                <p className="text-sm font-semibold text-content">
                  Also try our Kid Readiness Assessment
                </p>
                <p className="mt-2 text-sm text-content-muted">
                  A short quiz to understand your child&apos;s logical thinking
                  before enrolling in our Scratch course.
                </p>
                <Link href="/assessment" className="btn-secondary mt-4 inline-flex text-sm">
                  Start assessment →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="glass-card p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-content">
                  Register with email &amp; phone
                </h2>
                <p className="mt-2 text-sm text-content-muted">
                  Just a few details — we&apos;ll send the meeting link before each
                  session.
                </p>
                <div className="mt-6">
                  <ParentMeetingForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
