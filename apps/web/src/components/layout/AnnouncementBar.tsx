"use client";

import Link from "next/link";
import { PARENT_MEETING_PATH, TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";
import { getLogoAccent } from "@/lib/logo-accents";

const ITEMS = [
  { text: "Free monthly parent meeting", href: PARENT_MEETING_PATH },
  { text: "Junior Game Dev: Scratch & Logic — flagship course" },
  { text: "Live coding for ages 6–14" },
  { text: "Bangla or English instruction" },
  { text: "Book a free trial — no payment required", href: TRIAL_REGISTRATION_PATH },
] as const;

export function AnnouncementBar() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-b border-border bg-surface-muted/90 backdrop-blur-sm">
      <div className="flex w-max animate-marquee motion-reduce:animate-none items-center gap-10 py-2.5 pl-6">
        {doubled.map((item, index) => {
          const accent = getLogoAccent(index);
          return (
            <span
              key={`${item.text}-${index}`}
              className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-content-muted"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden="true" />
              {item.text}
              {"href" in item && item.href ? (
                <>
                  <span aria-hidden="true">·</span>
                  <Link href={item.href} className={`hover:underline ${accent.check}`}>
                    Learn more →
                  </Link>
                </>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}
