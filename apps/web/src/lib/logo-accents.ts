/** Logo tri-color accents — blue, coral, yellow in equal rotation. */
export const LOGO_ACCENTS = [
  {
    id: "blue",
    iconWrap:
      "bg-brand-green/15 border-brand-green/40 text-brand-green dark:bg-brand-green/25 dark:text-brand-green-light",
    cardGradient: "from-brand-green/20 via-brand-green/10 to-transparent",
    cardBorder: "border-brand-green/30 hover:border-brand-green/50",
    pill: "bg-brand-green/12 border-brand-green/35 text-brand-green dark:text-brand-green-light",
    stat: "text-brand-green-light",
    check: "text-brand-green",
    dot: "bg-brand-green",
    glow: "shadow-[0_0_28px_rgba(56,147,244,0.35)]",
  },
  {
    id: "coral",
    iconWrap:
      "bg-brand-pink/15 border-brand-pink/40 text-brand-pink dark:bg-brand-pink/25 dark:text-brand-pink-light",
    cardGradient: "from-brand-pink/20 via-brand-pink/10 to-transparent",
    cardBorder: "border-brand-pink/30 hover:border-brand-pink/50",
    pill: "bg-brand-pink/12 border-brand-pink/35 text-brand-pink dark:text-brand-pink-light",
    stat: "text-brand-pink-light",
    check: "text-brand-pink",
    dot: "bg-brand-pink",
    glow: "shadow-[0_0_28px_rgba(239,93,74,0.35)]",
  },
  {
    id: "yellow",
    iconWrap:
      "bg-brand-yellow/25 border-brand-yellow/45 text-brand-yellow-dark dark:text-brand-yellow-light",
    cardGradient: "from-brand-yellow/25 via-brand-yellow/12 to-transparent",
    cardBorder: "border-brand-yellow/35 hover:border-brand-yellow/55",
    pill: "bg-brand-yellow/18 border-brand-yellow/40 text-brand-yellow-dark dark:text-brand-yellow-light",
    stat: "text-brand-yellow-light",
    check: "text-brand-yellow-dark dark:text-brand-yellow-light",
    dot: "bg-brand-yellow",
    glow: "shadow-[0_0_28px_rgba(255,203,60,0.35)]",
  },
] as const;

export function getLogoAccent(index: number) {
  return LOGO_ACCENTS[index % LOGO_ACCENTS.length];
}
