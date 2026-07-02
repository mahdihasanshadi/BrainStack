"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ApiError, getCheckoutSessionStatus } from "@/lib/api";
import { formatBdt } from "@/lib/course-pricing";

function ManualPaymentContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Awaited<
    ReturnType<typeof getCheckoutSessionStatus>
  > | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing payment reference. Please start checkout again.");
      setLoading(false);
      return;
    }

    getCheckoutSessionStatus(sessionId)
      .then((data) => {
        if (data.provider !== "manual") {
          setError("This page is only for bKash / Nagad payments.");
          return;
        }
        if (!data.manualPayment) {
          setError(
            "Payment instructions are not configured. Please contact BrainStack support.",
          );
          return;
        }
        setSession(data);
      })
      .catch((err) => {
        setError(
          err instanceof ApiError
            ? err.message
            : "Could not load payment instructions.",
        );
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="site-container py-20 text-center">
        <p className="text-content-muted">Loading payment instructions…</p>
      </div>
    );
  }

  if (error || !session?.manualPayment) {
    return (
      <div className="site-container max-w-lg py-20">
        <div className="glass-card p-8 text-center">
          <p className="font-display text-xl font-bold text-content">Something went wrong</p>
          <p className="mt-3 text-content-muted">{error ?? "Unknown error"}</p>
          <Link href="/programs/logical-reasoning-scratch" className="btn-primary mt-6 inline-flex">
            Back to course
          </Link>
        </div>
      </div>
    );
  }

  const { manualPayment } = session;
  const methodLabel = manualPayment.merchantLabel;

  return (
    <div className="site-container max-w-2xl py-16 sm:py-20">
      <div className="glass-card overflow-hidden">
        <div className="border-b border-border bg-brand-yellow/10 px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark dark:text-brand-yellow-light">
            Step 2 of 2 · {methodLabel} payment
          </p>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-content">
            Pay, then confirm on WhatsApp
          </h1>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="rounded-2xl border border-border bg-surface-muted/40 p-5">
            <p className="text-sm text-content-muted">{session.courseTitle}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-content">
              {formatBdt(session.amountBdt)}
            </p>
            <p className="mt-1 text-sm text-content-muted">
              Reference: <code className="text-xs">{session.sessionId}</code>
            </p>
          </div>

          <ol className="space-y-4">
            {manualPayment.instructions.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0
                      ? "bg-brand-green/15 text-brand-green"
                      : index === 1
                        ? "bg-brand-pink/15 text-brand-pink"
                        : "bg-brand-yellow/20 text-brand-yellow-dark dark:text-brand-yellow-light"
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-content-muted">{step}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              {methodLabel} merchant number
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-content">
              {manualPayment.merchantNumber}
            </p>
          </div>

          <a
            href={manualPayment.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-[#25D366] px-6 py-4 font-display text-base font-bold text-white shadow-float transition-transform hover:scale-[1.02]"
          >
            <span aria-hidden="true">💬</span>
            WhatsApp e payment confirm korun
          </a>

          <p className="text-center text-xs text-content-faint">
            Usually confirmed within a few hours (9am–9pm BST). Add your Trx ID and
            screenshot in WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ManualCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="site-container py-20 text-center text-content-muted">
          Loading…
        </div>
      }
    >
      <ManualPaymentContent />
    </Suspense>
  );
}
