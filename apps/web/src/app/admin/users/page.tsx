"use client";

import { useEffect, useState } from "react";
import { AdminTable, AdminTableShell } from "@/components/admin/AdminTable";
import { ApiError, getAdminUsers, type AdminUserListItem } from "@/lib/api";
import { formatDateTime, formatLabel } from "@/lib/admin-format";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setUsers(await getAdminUsers());
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const parentCount = users.filter((user) => user.role === "parent").length;
  const studentCount = users.filter((user) => user.role === "student").length;

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
        <h1 className="font-display text-3xl font-extrabold text-white">Users</h1>
        <p className="mt-2 text-sm text-white/60">
          Registered platform accounts — {parentCount} parents, {studentCount} students.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
          {error}
        </div>
      ) : null}

      <AdminTable title="All users" count={users.length}>
        <AdminTableShell
          emptyMessage="No users registered yet."
          headers={["Joined", "Name", "Email", "Phone", "Role", "Verified"]}
          rows={users.map((user) => [
            formatDateTime(user.createdAt),
            user.fullName,
            user.email,
            user.phone,
            formatLabel(user.role),
            user.isVerified ? "Yes" : "No",
          ])}
        />
      </AdminTable>
    </div>
  );
}
