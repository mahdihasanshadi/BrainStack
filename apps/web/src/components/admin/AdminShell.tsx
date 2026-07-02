"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { useAuth } from "@/providers/AuthProvider";

const NAV: Array<{ href: string; label: string; exact?: boolean }> = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/registrations", label: "Trial registrations" },
  { href: "/admin/parent-meetings", label: "Parent meetings" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/purchases", label: "Purchases" },
  { href: "/admin/assessments", label: "Assessments" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-brand-green-dark text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-brand-green-dark/95 px-5 py-6 lg:w-64 lg:border-b-0 lg:border-r">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pink/20 text-lg">
              🛡️
            </span>
            <div>
              <BrandWordmark size="sm" onDark />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-yellow-light/80">
                Admin console
              </p>
            </div>
          </Link>

          <nav aria-label="Admin" className="mt-8 space-y-1">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-white/10 text-brand-yellow-light"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white/50">Signed in as</p>
            <p className="mt-1 truncate text-sm font-bold">{user?.fullName}</p>
            <p className="truncate text-xs text-white/60">{user?.email}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-4 w-full rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white/80 transition-colors hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          <div className="border-b border-white/10 px-5 py-4 lg:hidden">
            <p className="text-sm font-bold text-brand-yellow-light">BrainStack Admin</p>
          </div>
          <div className="px-5 py-8 sm:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
