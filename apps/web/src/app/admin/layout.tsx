"use client";

import { usePathname } from "next/navigation";
import { AdminGate } from "@/components/admin/AdminGate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return children;
  }

  return <AdminGate>{children}</AdminGate>;
}
