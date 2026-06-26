"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email: email.trim().toLowerCase(), password });
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Invalid credentials. Please check and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center py-16 sm:py-24">
      <AnimatedBackground variant="hero" showStars />

      <div className="site-container relative z-10 w-full max-w-md">
        <div className="glass-card p-8 sm:p-10 shadow-glow">
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink/15 text-2xl">
              🐱
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-content sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-content-muted">
              Log in to your parent dashboard to view schedules and classes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="loginEmail" className="form-label">
                Parent Email
              </label>
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input mt-1.5"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
              </div>
              <input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input mt-1.5"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 font-bold shadow-glow"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-content-faint">
            Don&apos;t have an account? Your account is created automatically when enrolling in a course.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="relative flex min-h-[80vh] items-center justify-center py-16">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-pink border-t-transparent" />
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
