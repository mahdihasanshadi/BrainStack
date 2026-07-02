"use client";

import { useEffect, useState } from "react";
import { AdminTable, AdminTableShell } from "@/components/admin/AdminTable";
import { ApiError, getAdminAssessments, type AdminKidAssessment } from "@/lib/api";
import { formatDateTime, formatLabel } from "@/lib/admin-format";

export default function AdminAssessmentsPage() {
  const [assessments, setAssessments] = useState<AdminKidAssessment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setAssessments(await getAdminAssessments());
      } catch (err) {
        setError(
          err instanceof ApiError ? err.message : "Failed to load assessments.",
        );
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-white">
          Kid assessments
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Readiness quiz submissions from the public assessment flow.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
          {error}
        </div>
      ) : null}

      <AdminTable title="All assessments" count={assessments.length}>
        <AdminTableShell
          emptyMessage="No kid assessments submitted yet."
          headers={[
            "Submitted",
            "Parent email",
            "Child age",
            "Score",
            "Readiness",
            "Recommendation",
          ]}
          rows={assessments.map((assessment) => [
            formatDateTime(assessment.createdAt),
            assessment.parentEmail ?? "—",
            assessment.childAge,
            assessment.score,
            formatLabel(assessment.readinessLevel),
            <span key={assessment.id} className="max-w-xs whitespace-normal">
              {assessment.recommendation}
            </span>,
          ])}
        />
      </AdminTable>
    </div>
  );
}
