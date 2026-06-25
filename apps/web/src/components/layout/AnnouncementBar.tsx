"use client";

import Link from "next/link";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const ITEMS = [
  "Free trial — no payment required",
  "Live Scratch coding for ages 6–14",
  "Bangla or English instruction",
  "Small groups · real instructors",
  "Building the next generation of creators",
] as const;

export function AnnouncementBar() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-b border-border bg-surface-muted/80 backdrop-blur-sm">
      <div className="flex animate-marquee motion-reduce:animate-none whitespace-nowrap py-2.5">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-content-muted"
          >
            <span className="h-1 w-1 rounded-full bg-brand-yellow" aria-hidden="true" />
            {item}
            <Link
              href={TRIAL_REGISTRATION_PATH}
              className="text-brand-green transition-colors hover:text-brand-green-dark dark:text-brand-yellow-light"
            >
              Book now →
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}
