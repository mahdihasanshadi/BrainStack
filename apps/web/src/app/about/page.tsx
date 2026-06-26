import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { MissionSection } from "@/components/home/MissionSection";
import { PARENT_MEETING_PATH } from "@/components/layout/nav-links";

export const metadata: Metadata = {
  title: "About BrainStack | Coding Education for Kids",
  description:
    "BrainStack is Bangladesh's premium live coding platform helping kids aged 6–14 build logical reasoning and Scratch skills.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />
        <div className="site-container relative max-w-3xl">
          <p className="eyebrow">About BrainStack</p>
          <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
            Building the next generation of{" "}
            <span className="gradient-text">creators</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-content-muted">
            BrainStack is a live online coding platform for kids in Bangladesh and
            beyond. We combine Scratch, logical reasoning, weekly live classes, and
            Udemy-style pre-recorded lessons — with gamification that keeps children
            motivated to finish every assignment.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-content-muted">
            We believe parents deserve clarity too. That&apos;s why we host a free
            monthly parent meeting where we explain our approach and answer every
            question in a live Q&amp;A.
          </p>
          <Link href={PARENT_MEETING_PATH} className="btn-primary mt-8 inline-flex">
            Join free parent meeting
          </Link>
        </div>
      </section>

      <MissionSection />
    </main>
  );
}
