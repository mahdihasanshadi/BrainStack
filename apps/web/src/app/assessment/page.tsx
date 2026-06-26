import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { KidAssessmentForm } from "@/components/registration/KidAssessmentForm";

export const metadata: Metadata = {
  title: "Kid Readiness Assessment | BrainStack",
  description:
    "Free kid readiness quiz — discover your child's logical thinking strengths and course fit for BrainStack Scratch & logic programs.",
};

export default function AssessmentPage() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="section" />

        <div className="site-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mx-auto">Kid verification</p>
            <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
              Discover your child&apos;s{" "}
              <span className="gradient-text">readiness</span>
            </h1>
            <p className="mt-4 text-lg text-content-muted">
              A quick 5-question assessment to understand logical thinking,
              focus, and curiosity — so you know if our Scratch course is the
              right fit.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="glass-card p-6 sm:p-8">
              <KidAssessmentForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
