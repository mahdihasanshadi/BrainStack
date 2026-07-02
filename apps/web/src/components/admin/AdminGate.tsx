"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AdminShell } from "./AdminShell";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
      return;
    }

    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-green-dark">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-yellow border-t-transparent" />
          <p className="mt-4 text-sm text-white/70">Loading admin console…</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
