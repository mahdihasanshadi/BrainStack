"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { normalizeAdminLoginIdentifier } from "@/lib/admin-format";
import { useAuth } from "@/providers/AuthProvider";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectUrl = searchParams.get("redirect") || "/admin";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({
        email: normalizeAdminLoginIdentifier(username),
        password,
      });

      if (response.user.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }

      router.push(redirectUrl);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-green-dark px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(56,147,244,0.12)] backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <BrandWordmark showTagline size="md" onDark className="items-center" />
          <p className="mt-4 text-sm text-white/60">Sign in to the admin console</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="adminUsername" className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Username
            </label>
            <input
              id="adminUsername"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-brand-green-dark/60 px-4 py-3 text-white outline-none ring-brand-yellow focus:ring-2"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="adminPassword" className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-brand-green-dark/60 px-4 py-3 text-white outline-none ring-brand-yellow focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3.5 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-yellow px-4 py-3.5 font-bold text-brand-green-dark transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in to admin"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/45">
          Default credentials: <span className="text-white/70">admin</span> /{" "}
          <span className="text-white/70">admin</span>
        </p>

        <p className="mt-4 text-center text-xs text-white/45">
          <Link href="/" className="text-brand-green-light hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-brand-green-dark">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-yellow border-t-transparent" />
        </main>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
