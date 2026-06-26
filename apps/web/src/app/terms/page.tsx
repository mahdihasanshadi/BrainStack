import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | BrainStack",
  description: "BrainStack terms of use for courses, parent meetings, and platform access.",
};

export default function TermsPage() {
  return (
    <main className="py-20 sm:py-28">
      <div className="site-container max-w-3xl">
        <h1 className="font-display text-section-sm font-extrabold text-content sm:text-section">
          Terms of Use
        </h1>
        <p className="mt-4 text-content-muted">Last updated: June 2026</p>

        <div className="mt-10 space-y-6 text-content-muted">
          <p>
            By using BrainStack, you agree to these terms. Courses include live
            weekly sessions and pre-recorded content. Refund policies will be
            communicated at purchase.
          </p>
          <h2 className="font-display text-xl font-bold text-content">Parent consent</h2>
          <p>
            Parents or legal guardians must register on behalf of children under 18
            and provide consent for educational communications.
          </p>
          <h2 className="font-display text-xl font-bold text-content">Payments</h2>
          <p>
            Course purchases may be processed via Stripe supporting bKash, Nagad,
            Visa, Mastercard, and other methods as available in your region.
          </p>
        </div>
      </div>
    </main>
  );
}
