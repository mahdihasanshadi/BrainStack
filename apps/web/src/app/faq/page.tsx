import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/home/FaqSection";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { PARENT_MEETING_PATH } from "@/components/layout/nav-links";

export const metadata: Metadata = {
  title: "FAQ | BrainStack",
  description: "Frequently asked questions about BrainStack courses, trial classes, parent meetings, and payments.",
};

export default function FaqPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="minimal" />
        <div className="site-container relative max-w-3xl text-center">
          <p className="eyebrow mx-auto">FAQ</p>
          <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
            Questions from{" "}
            <span className="gradient-text">parents like you</span>
          </h1>
          <p className="mt-5 text-lg text-content-muted">
            Can&apos;t find your answer? Join our monthly parent meeting for live Q&amp;A.
          </p>
          <Link href={PARENT_MEETING_PATH} className="btn-primary mt-6 inline-flex">
            Register for parent meeting
          </Link>
        </div>
      </section>

      <FaqSection />
    </main>
  );
}
