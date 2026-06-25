import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { TrialRegistrationForm } from "@/components/registration/TrialRegistrationForm";

export const metadata: Metadata = {
  title: "Book a free trial class | BrainStack",
  description:
    "Register for a free BrainStack trial coding class for children aged 6–14.",
};

export default function TrialClassRegistrationPage() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />

        <div className="site-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mx-auto">Free trial class</p>
            <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
              Register your child for a{" "}
              <span className="gradient-text">trial coding class</span>
            </h1>
            <p className="mt-4 text-lg text-content-muted">
              Three quick steps — contact details, child info, then pick a class
              time that works for your family.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="glass-card p-6 sm:p-8">
              <TrialRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
