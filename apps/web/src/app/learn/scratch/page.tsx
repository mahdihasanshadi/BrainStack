"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { ScratchPracticePanel } from "@/components/learn/ScratchPracticePanel";
import { useAuth } from "@/providers/AuthProvider";

export default function ScratchPlaygroundPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/learn/scratch");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="relative flex min-h-[60vh] items-center justify-center">
        <AnimatedBackground variant="minimal" />
        <p className="text-content-muted">Loading playground…</p>
      </main>
    );
  }

  return (
    <main className="relative py-8 sm:py-10">
      <AnimatedBackground variant="minimal" />

      <div className="site-container relative">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Scratch playground</p>
            <h1 className="mt-3 font-display text-section-sm font-extrabold text-content sm:text-section">
              Build &amp; test your{" "}
              <span className="gradient-text">Scratch projects</span>
            </h1>
            <p className="mt-3 max-w-2xl text-content-muted">
              Drag blocks, run your code with the green flag, and practice every class lesson
              right here — no install needed.
            </p>
          </div>
          <Link href="/dashboard" className="btn-secondary shrink-0 px-5 py-2.5 text-sm font-semibold">
            ← Back to dashboard
          </Link>
        </div>

        <ScratchPracticePanel initialClassNumber={1} />
      </div>
    </main>
  );
}
