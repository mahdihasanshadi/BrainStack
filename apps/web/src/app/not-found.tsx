import Link from "next/link";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20 text-center">
      <AnimatedBackground variant="hero" showStars />

      <div className="site-container relative">
        <p className="eyebrow mx-auto">404</p>
        <h1 className="mt-6 font-display text-section-sm font-extrabold text-content sm:text-section">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-content-muted">
          The page you&apos;re looking for doesn&apos;t exist. Head back home to
          explore programs, or book a free trial for your child.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary px-8">
            Back to homepage
          </Link>
          <Link href="/#courses" className="btn-secondary px-8">
            Browse programs
          </Link>
        </div>
      </div>
    </main>
  );
}
