import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

const PROGRAM_LINKS = [
  {
    href: "/programs/logical-reasoning-scratch",
    label: "Logical Reasoning & Scratch",
  },
  { href: "/programs", label: "All programs" },
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

const SOCIAL = [
  { href: "https://facebook.com", label: "Facebook", icon: "f" },
  { href: "https://youtube.com", label: "YouTube", icon: "▶" },
  { href: "https://instagram.com", label: "Instagram", icon: "◎" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-brand-green-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-brand-yellow/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-brand-green/20 blur-3xl"
      />

      <div className="site-container relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-3">
            <LogoMark size="sm" />
            <BrandWordmark showTagline size="md" onDark />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Premium live coding education for curious kids. Embrace your excellence —
            one project, one class, one confident kid at a time.
          </p>
          <Link
            href="/webinar"
            className="btn-primary mt-6 inline-flex text-sm"
          >
            Join parent meeting
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
              Contact
            </p>
            <p className="mt-2 text-sm text-white/70">
              <a
                href="mailto:hello@brainstack.studio"
                className="hover:text-brand-yellow-light"
              >
                hello@brainstack.studio
              </a>
            </p>
            <p className="mt-1 text-sm text-white/50">
              Support: 10:00 AM – 7:00 PM (GMT+6)
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
            Programs
          </h2>
          <ul className="mt-4 space-y-2.5">
            {PROGRAM_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-brand-yellow-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-brand-yellow-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
            Legal
          </h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-brand-yellow-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
            Follow us
          </p>
          <div className="mt-3 flex gap-3">
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sm font-bold transition-all hover:border-brand-yellow/40 hover:bg-brand-yellow/20"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} BrainStack. All rights reserved.
          </p>
          <p>Crafted for the next generation 🚀</p>
        </div>
      </div>
    </footer>
  );
}
