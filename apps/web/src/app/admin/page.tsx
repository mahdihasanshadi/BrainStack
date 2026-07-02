"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { ApiError, getAdminStats, type AdminStats } from "@/lib/api";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setStats(await getAdminStats());
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-yellow border-t-transparent" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-red-100">
        {error ?? "Unable to load admin dashboard."}
      </div>
    );
  }

  const { totals, recent } = stats;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow-light/80">
          Dashboard
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-white">
          BrainStack operations
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Track trial class registrations, parent meetings, enrolled families, and payments in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Trial registrations"
          value={totals.trialRegistrations}
          hint={`+${recent.trialRegistrationsLast7Days} in the last 7 days`}
          accent="pink"
        />
        <StatCard
          label="Students (trial signups)"
          value={totals.trialRegistrations}
          hint="One child per trial registration lead"
          accent="yellow"
        />
        <StatCard
          label="Parent meetings"
          value={totals.parentMeetings}
          hint={`+${recent.parentMeetingsLast7Days} in the last 7 days`}
          accent="green"
        />
        <StatCard
          label="Registered parent accounts"
          value={totals.registeredParents}
          hint={`${totals.registeredStudents} student accounts`}
          accent="green"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Completed purchases"
          value={totals.completedPurchases}
          hint={`${totals.pendingPurchases} pending · +${recent.purchasesLast7Days} this week`}
          accent="yellow"
        />
        <StatCard
          label="Kid assessments"
          value={totals.kidAssessments}
          accent="pink"
        />
        <StatCard
          label="All purchases"
          value={totals.coursePurchases}
          accent="green"
        />
        <StatCard
          label="Admin users"
          value={totals.registeredAdmins}
          accent="pink"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            href: "/admin/registrations",
            title: "Trial registrations",
            body: "Parents who booked a free trial class, with child details and preferred slot.",
          },
          {
            href: "/admin/parent-meetings",
            title: "Parent meetings",
            body: "Monthly webinar / parent meeting signups and questions.",
          },
          {
            href: "/admin/purchases",
            title: "Purchases",
            body: "Stripe, bKash/Nagad manual, and demo checkout records.",
          },
          {
            href: "/admin/users",
            title: "Platform users",
            body: "Registered parent, student, and admin accounts.",
          },
          {
            href: "/admin/assessments",
            title: "Kid assessments",
            body: "Readiness quiz submissions and recommendations.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-brand-yellow/30 hover:bg-white/10"
          >
            <h2 className="font-display text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-white/60">{item.body}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-yellow-light">
              Open section →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
