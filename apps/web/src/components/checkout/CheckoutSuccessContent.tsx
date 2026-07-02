"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError, getCheckoutSessionStatus } from "@/lib/api";
import { formatBdt } from "@/lib/course-pricing";
import { useAuth } from "@/providers/AuthProvider";

export function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { register, login, user: authUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Session/buyer details
  const [courseTitle, setCourseTitle] = useState("");
  const [amountBdt, setAmountBdt] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");

  // Step state: "verify" | "password_setup" | "account_conflict" | "success"
  const [step, setStep] = useState<
    "verify" | "password_setup" | "account_conflict" | "success"
  >("verify");
  const [password, setPassword] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError(
        "Missing payment session. Please contact support if you were charged.",
      );
      setLoading(false);
      return;
    }

    getCheckoutSessionStatus(sessionId)
      .then((status) => {
        if (status.status !== "completed") {
          setError("Payment is still processing or was not completed.");
          return;
        }

        setCourseTitle(status.courseTitle);
        setAmountBdt(status.amountBdt);
        setEmail(status.email);
        setParentName(status.parentName || "Parent");
        setPhone(status.phone || "");

        // If the user is already authenticated in this session, skip setup
        if (
          authUser &&
          authUser.email.toLowerCase() === status.email.toLowerCase()
        ) {
          setStep("success");
        } else {
          setStep("password_setup");
        }
      })
      .catch((err) => {
        setError(
          err instanceof ApiError
            ? err.message
            : "Could not verify your payment. Please contact support with your receipt.",
        );
      })
      .finally(() => setLoading(false));
  }, [sessionId, authUser]);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSetupError(null);
    setSetupLoading(true);

    if (password.length < 8) {
      setSetupError("Password must be at least 8 characters long.");
      setSetupLoading(false);
      return;
    }

    try {
      // 1. Try to register user
      await register({
        fullName: parentName,
        email: email.toLowerCase(),
        password,
        phone,
      });
      setStep("success");
    } catch (err: any) {
      // 2. If user already exists, check status. If it's a conflict, show login flow
      if (err instanceof ApiError && err.status === 409) {
        setStep("account_conflict");
      } else {
        setSetupError(
          err?.message || "Unable to set up password. Please try again.",
        );
      }
    } finally {
      setSetupLoading(false);
    }
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSetupError(null);
    setSetupLoading(true);

    try {
      await login({
        email: email.toLowerCase(),
        password,
      });
      setStep("success");
    } catch (err: any) {
      setSetupError("Incorrect password. Please try again.");
    } finally {
      setSetupLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="glass-card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-pink border-t-transparent" />
        <p className="mt-4 text-content-muted">Verifying your payment…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="glass-card mx-auto max-w-xl p-10 text-center"
        role="alert"
      >
        <span className="text-4xl">⚠️</span>
        <p className="mt-4 font-display text-xl font-bold text-content">
          Payment verification issue
        </p>
        <p className="mt-3 text-content-muted">{error}</p>
        <Link href="/contact" className="btn-secondary mt-8 inline-flex px-8">
          Contact support
        </Link>
      </div>
    );
  }

  if (step === "password_setup") {
    return (
      <div className="glass-card mx-auto max-w-md p-8 text-left shadow-glow">
        <div className="text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-3xl">
            ✔️
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-content">
            Payment Confirmed!
          </h2>
          <p className="mt-2 text-sm text-content-muted">
            Enrolled in <strong>{courseTitle}</strong> for{" "}
            {amountBdt ? formatBdt(amountBdt) : ""}
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-display font-bold text-content text-lg">
            Create your account password
          </h3>
          <p className="mt-1 text-xs text-content-muted">
            You will use this password along with your email (
            <strong>{email}</strong>) to log in and access previous classes in
            the future.
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
            <div>
              <label className="form-label" htmlFor="setupPassword">
                Choose Password
              </label>
              <input
                id="setupPassword"
                type="password"
                required
                className="form-input mt-1.5"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {setupError && (
              <p className="text-sm font-semibold text-red-500">{setupError}</p>
            )}

            <button
              type="submit"
              disabled={setupLoading}
              className="btn-primary w-full py-3 font-bold shadow-glow"
            >
              {setupLoading
                ? "Creating account..."
                : "Create Account & Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === "account_conflict") {
    return (
      <div className="glass-card mx-auto max-w-md p-8 text-left shadow-glow">
        <div className="text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/10 text-3xl">
            🔒
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold text-content">
            Account Exists
          </h2>
          <p className="mt-2 text-sm text-content-muted">
            An account with the email <strong>{email}</strong> already exists in
            our system.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-content-muted">
            Please log in with your password to link your purchase and unlock
            your classes.
          </p>

          <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
            <div>
              <label className="form-label" htmlFor="conflictPassword">
                Password
              </label>
              <input
                id="conflictPassword"
                type="password"
                required
                className="form-input mt-1.5"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {setupError && (
              <p className="text-sm font-semibold text-red-500">{setupError}</p>
            )}

            <button
              type="submit"
              disabled={setupLoading}
              className="btn-primary w-full py-3 font-bold shadow-glow"
            >
              {setupLoading ? "Verifying..." : "Log In & Link Course"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-pink/15 text-4xl">
        🎉
      </span>
      <h1 className="mt-8 font-display text-section-sm font-extrabold text-content sm:text-section">
        Welcome to <span className="gradient-text">BrainStack</span>!
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-content-muted">
        Your enrollment in <strong>{courseTitle}</strong> is confirmed
        {amountBdt ? ` for ${formatBdt(amountBdt)}` : ""}. Let&apos;s get you
        started with a warm welcome and your onboarding walkthrough.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/onboarding" className="btn-primary px-10 py-4 shadow-glow">
          Start onboarding →
        </Link>
        <Link href="/dashboard" className="btn-secondary px-10 py-4">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
