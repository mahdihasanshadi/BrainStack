"use client";

import { useEffect, useState } from "react";
import { AdminTable, AdminTableShell } from "@/components/admin/AdminTable";
import {
  ApiError,
  getAdminParentMeetingLeads,
  type ParentMeetingLead,
} from "@/lib/api";
import { formatDateTime } from "@/lib/admin-format";

export default function AdminParentMeetingsPage() {
  const [leads, setLeads] = useState<ParentMeetingLead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLeads(await getAdminParentMeetingLeads());
      } catch (err) {
        setError(
          err instanceof ApiError ? err.message : "Failed to load parent meeting leads.",
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
          Parent meetings
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Free monthly parent meeting / webinar registrations.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
          {error}
        </div>
      ) : null}

      <AdminTable title="All parent meeting signups" count={leads.length}>
        <AdminTableShell
          emptyMessage="No parent meeting registrations yet."
          headers={["Registered", "Parent", "Contact", "Child", "Questions"]}
          rows={leads.map((lead) => [
            formatDateTime(lead.createdAt),
            lead.parentName,
            <span key={`${lead.id}-contact`} className="block">
              <span className="block">{lead.email}</span>
              <span className="block text-white/55">{lead.phone}</span>
            </span>,
            <span key={`${lead.id}-child`} className="block">
              <span className="block">{lead.childName ?? "—"}</span>
              <span className="block text-white/55">Age {lead.childAge}</span>
            </span>,
            lead.questions ?? "—",
          ])}
        />
      </AdminTable>
    </div>
  );
}
