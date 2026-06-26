import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { PARENT_MEETING_PATH } from "@/components/layout/nav-links";

export const metadata: Metadata = {
  title: "Contact BrainStack",
  description: "Get in touch with BrainStack — support hours, email, and parent meeting registration.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="section" />
        <div className="site-container relative max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
            We&apos;re here to{" "}
            <span className="gradient-text">help</span>
          </h1>
          <p className="mt-5 text-lg text-content-muted">
            Questions about courses, pricing, or your child&apos;s readiness? Reach
            out anytime during support hours.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="glass-card p-6">
              <h2 className="font-display font-bold text-content">Email</h2>
              <a
                href="mailto:hello@brainstack.studio"
                className="mt-2 block text-brand-green hover:underline dark:text-brand-yellow-light"
              >
                hello@brainstack.studio
              </a>
            </div>
            <div className="glass-card p-6">
              <h2 className="font-display font-bold text-content">Support hours</h2>
              <p className="mt-2 text-content-muted">10:00 AM – 7:00 PM (GMT+6)</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-6">
            <h2 className="font-display font-bold text-content">
              Prefer a live conversation?
            </h2>
            <p className="mt-2 text-sm text-content-muted">
              Join our free monthly parent meeting — the fastest way to get answers
              about courses, teaching methods, and pricing.
            </p>
            <Link href={PARENT_MEETING_PATH} className="btn-primary mt-4 inline-flex">
              Register for parent meeting
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
