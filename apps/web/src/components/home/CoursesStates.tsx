import type { CourseSummary } from "@/lib/api";
import { CourseCard } from "./CourseCard";

export function CoursesLoadingState() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
      aria-busy="true"
    >
      {[1, 2, 3].map((slot) => (
        <div key={slot} className="glass-card overflow-hidden">
          <div className="skeleton h-28 w-full rounded-none" />
          <div className="space-y-3 p-7">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-5/6" />
            <div className="skeleton mt-4 h-10 w-full" />
          </div>
        </div>
      ))}
      <p className="sr-only">Loading courses…</p>
    </div>
  );
}

export function CoursesEmptyState() {
  return (
    <div className="glass-card p-10 text-center" role="status">
      <span aria-hidden="true" className="text-4xl">
        📚
      </span>
      <p className="mt-4 font-display text-xl font-bold text-content">
        Programs launching soon
      </p>
      <p className="mx-auto mt-3 max-w-md text-content-muted">
        We&apos;re preparing our course catalog. Book a free trial and our team
        will recommend the perfect track for your child.
      </p>
    </div>
  );
}

export function CoursesErrorState() {
  return (
    <div className="glass-card border-red-500/20 p-8 sm:p-10" role="alert">
      <span aria-hidden="true" className="text-3xl">
        🔌
      </span>
      <p className="mt-3 font-display text-xl font-bold text-content">
        Couldn&apos;t load programs
      </p>
      <p className="mt-3 max-w-xl text-content-muted">
        The BrainStack API isn&apos;t reachable. If running locally, confirm the
        API is up and{" "}
        <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">
          NEXT_PUBLIC_API_URL
        </code>{" "}
        is set correctly.
      </p>
    </div>
  );
}

export function CoursesGrid({ courses }: { courses: CourseSummary[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
}
