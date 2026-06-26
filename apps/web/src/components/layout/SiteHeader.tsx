"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { PARENT_MEETING_CTA, PRIMARY_NAV_LINKS, TRIAL_CTA } from "./nav-links";
import { useAuth } from "@/providers/AuthProvider";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-surface-glass shadow-glass backdrop-blur-2xl dark:shadow-glass-dark"
          : "bg-transparent"
      }`}
    >
      <div className="site-container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <LogoMark size="sm" className="transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-tight text-content">
              Brain<span className="text-[#3893F4]">Stack</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-content-faint sm:block">
              Coding for kids
            </span>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link href="/dashboard" className="nav-link font-semibold text-brand-pink">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="btn-secondary hidden px-4 py-2.5 text-sm sm:inline-flex"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-primary hidden px-5 py-2.5 shadow-glow sm:inline-flex"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="nav-link hidden text-sm font-semibold mr-2 lg:inline-block"
              >
                Log In
              </Link>
              <Link
                href={PARENT_MEETING_CTA.href}
                className="btn-secondary hidden px-4 py-2.5 text-sm sm:inline-flex"
              >
                {PARENT_MEETING_CTA.label}
              </Link>
              <Link
                href={TRIAL_CTA.href}
                className="btn-primary hidden px-5 py-2.5 shadow-glow sm:inline-flex"
              >
                {TRIAL_CTA.label}
              </Link>
            </>
          )}

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
