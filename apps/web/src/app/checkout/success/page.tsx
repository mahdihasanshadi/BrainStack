import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { CheckoutSuccessContent } from "@/components/checkout/CheckoutSuccessContent";

export const metadata: Metadata = {
  title: "Welcome to BrainStack | Enrollment Complete",
  description: "Your BrainStack course enrollment is complete. Start your onboarding journey.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" showStars />

        <div className="site-container relative text-center">
          <Suspense
            fallback={
              <div className="glass-card mx-auto max-w-xl p-10 text-center">
                <p className="text-content-muted">Verifying your payment…</p>
              </div>
            }
          >
            <CheckoutSuccessContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
