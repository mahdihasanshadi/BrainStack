"use client";

import { useState } from "react";
import Link from "next/link";
import { ApiError, createCheckoutSession } from "@/lib/api";
import { formatBdt, getEffectivePrice } from "@/lib/course-pricing";
import { isValidEmail, normalizeEmail } from "@/components/registration/registration-utils";

const PAYMENT_OPTIONS = [
  { id: "card" as const, label: "Visa / Mastercard", icon: "💳" },
  { id: "bkash" as const, label: "bKash", icon: "📱" },
  { id: "nagad" as const, label: "Nagad", icon: "📱" },
];

interface CheckoutFormProps {
  courseSlug: string;
  courseTitle: string;
  priceBdt: number;
  originalPriceBdt: number;
}

export function CheckoutForm({
  courseSlug,
  courseTitle,
  priceBdt,
  originalPriceBdt,
}: CheckoutFormProps) {
  const { original, sale, discountPct } = getEffectivePrice(
    priceBdt,
    originalPriceBdt,
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<(typeof PAYMENT_OPTIONS)[number]["id"]>("card");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!phone.trim()) {
      setError("Phone number is required for payment receipts.");
      return;
    }

    setSubmitting(true);

    try {
      const session = await createCheckoutSession({
        courseSlug,
        email: normalizeEmail(email),
        phone: phone.trim(),
        parentName: parentName.trim() || undefined,
        paymentMethod,
      });

      window.location.href = session.checkoutUrl;
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to start checkout. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-5">
        <p className="text-sm text-content-muted">You&apos;re enrolling in</p>
        <p className="font-display text-lg font-bold text-content">{courseTitle}</p>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <p className="font-display text-3xl font-extrabold text-content">
            {formatBdt(sale)}
          </p>
          <p className="text-lg text-content-faint line-through">
            {formatBdt(original)}
          </p>
          {discountPct > 0 ? (
            <span className="rounded-md border border-green-500/30 bg-green-500/15 px-2.5 py-1 text-xs font-bold text-green-500">
              {discountPct}% OFF — limited time
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-xs text-content-muted">
          This is the only fee for the full 4-month course. No hidden charges.
        </p>
      </div>

      <div>
        <label htmlFor="checkoutName" className="form-label">
          Parent name
        </label>
        <input
          id="checkoutName"
          className="form-input"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="checkoutEmail" className="form-label">
          Email
        </label>
        <input
          id="checkoutEmail"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="checkoutPhone" className="form-label">
          Phone <span className="text-content-faint">(for receipts)</span>
        </label>
        <input
          id="checkoutPhone"
          type="tel"
          className="form-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01XXXXXXXXX"
          required
        />
      </div>

      <fieldset>
        <legend className="form-label">Payment method</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {PAYMENT_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm transition-colors ${
                paymentMethod === option.id
                  ? "border-brand-pink bg-brand-pink/10 text-content"
                  : "border-border bg-surface-muted/40 text-content-muted hover:border-brand-pink/40"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.id}
                checked={paymentMethod === option.id}
                onChange={() => setPaymentMethod(option.id)}
                className="sr-only"
              />
              <span>{option.icon}</span>
              <span className="font-semibold">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-content-faint">
          {paymentMethod === "card"
            ? "Visa / Mastercard — secure checkout via Stripe."
            : paymentMethod === "bkash"
              ? "bKash — send money, then confirm on WhatsApp (kotha diye)."
              : "Nagad — send money, then confirm on WhatsApp (kotha diye)."}
        </p>
      </fieldset>

      {error ? <p className="form-error">{error}</p> : null}

      <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
        {submitting
          ? "Starting checkout…"
          : paymentMethod === "card"
            ? `Pay ${formatBdt(sale)} with card`
            : `Continue with ${paymentMethod === "bkash" ? "bKash" : "Nagad"}`}
      </button>

      <p className="text-center text-xs text-content-faint">
        By purchasing you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Use
        </Link>
        . 30-day money-back guarantee.
      </p>
    </form>
  );
}
