"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { PRIMARY_NAV_LINKS, TRIAL_CTA } from "./nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-glass backdrop-blur-xl"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[calc(4rem+2.5rem)] z-50 border-b border-border bg-surface-glass p-5 shadow-float backdrop-blur-2xl"
          >
            <nav aria-label="Mobile primary" className="flex flex-col gap-1">
              {PRIMARY_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link py-3"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-3">
                <ThemeToggle />
                <Link
                  href={TRIAL_CTA.href}
                  className="btn-primary flex-1 justify-center"
                  onClick={() => setOpen(false)}
                >
                  {TRIAL_CTA.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
