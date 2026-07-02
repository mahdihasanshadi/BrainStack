"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-4xl" aria-hidden="true">
        ⚠️
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-content">Something went wrong</h1>
      <p className="mt-3 max-w-md text-content-muted">
        This page hit an unexpected error. Try again, or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary px-6 py-3">
          Try again
        </button>
        <Link href="/" className="btn-secondary px-6 py-3">
          Go home
        </Link>
      </div>
    </main>
  );
}
