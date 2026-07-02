"use client";

import { useEffect, useState } from "react";
import { AdminTable, AdminTableShell } from "@/components/admin/AdminTable";
import { ApiError, getAdminPurchases, type AdminPurchase } from "@/lib/api";
import { formatBdt, formatDateTime, formatLabel } from "@/lib/admin-format";

export default function AdminPurchasesPage() {
  const [purchases, setPurchases] = useState<AdminPurchase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setPurchases(await getAdminPurchases());
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load purchases.");
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
        <h1 className="font-display text-3xl font-extrabold text-white">Purchases</h1>
        <p className="mt-2 text-sm text-white/60">
          Course checkout records from Stripe, manual bKash/Nagad, and demo mode.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
          {error}
        </div>
      ) : null}

      <AdminTable title="All purchases" count={purchases.length}>
        <AdminTableShell
          emptyMessage="No purchases yet."
          headers={[
            "Created",
            "Course",
            "Parent",
            "Contact",
            "Amount",
            "Status",
            "Provider",
          ]}
          rows={purchases.map((purchase) => [
            formatDateTime(purchase.createdAt),
            <span key={`${purchase.id}-course`} className="block">
              <span className="block font-semibold">{purchase.courseTitle}</span>
              <span className="block text-white/55">{purchase.courseSlug}</span>
            </span>,
            purchase.parentName ?? "—",
            <span key={`${purchase.id}-contact`} className="block">
              <span className="block">{purchase.email}</span>
              <span className="block text-white/55">{purchase.phone ?? "—"}</span>
            </span>,
            <span key={`${purchase.id}-amount`} className="block">
              <span className="block font-semibold">{formatBdt(purchase.amountBdt)}</span>
              <span className="block text-white/55 line-through">
                {formatBdt(purchase.originalPriceBdt)}
              </span>
            </span>,
            formatLabel(purchase.status),
            `${formatLabel(purchase.provider)}${purchase.paymentMethod ? ` · ${purchase.paymentMethod}` : ""}`,
          ])}
        />
      </AdminTable>
    </div>
  );
}
