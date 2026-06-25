import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const PROGRAM_LINKS = [
  { href: "/programs/track-1", label: "Track 1 (Ages 6–8)" },
  { href: "/programs/track-2", label: "Track 2 (Ages 9–11)" },
  { href: "/programs/track-3", label: "Track 3 (Ages 12–14)" },
] as const;

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-surface-muted/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div className="site-container relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <LogoMark size="sm" />
            <span className="font-display text-lg font-bold text-content">BrainStack</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-content-muted">
            Premium live coding education for curious kids. Building the next
            generation of creators, one project at a time.
          </p>
          <Link href="/trial-class-registration" className="btn-primary mt-6 inline-flex text-sm">
            Book free trial
          </Link>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-brand-yellow-light">
            Programs
          </h2>
          <ul className="mt-4 space-y-2.5">
            {PROGRAM_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-brand-yellow-light">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-green dark:text-brand-yellow-light">
            Legal
          </h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="site-container flex flex-col gap-2 py-6 text-sm text-content-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} BrainStack. All rights reserved.</p>
          <p>Crafted for the next generation 🚀</p>
        </div>
      </div>
    </footer>
  );
}
