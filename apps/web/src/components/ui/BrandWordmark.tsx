const TAGLINE = "Embrace your excellence";

interface BrandWordmarkProps {
  /** Show tagline under the name */
  showTagline?: boolean;
  /** sm = header size, md = footer/default */
  size?: "sm" | "md";
  className?: string;
  /** For dark backgrounds (footer) */
  onDark?: boolean;
}

export function BrandWordmark({
  showTagline = false,
  size = "sm",
  className = "",
  onDark = false,
}: BrandWordmarkProps) {
  const titleClass =
    size === "sm"
      ? "font-display text-lg font-bold leading-tight"
      : "font-display text-lg font-bold";

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={titleClass}>
        <span className="text-brand-pink dark:text-brand-pink-light">Brain</span>
        <span className="text-brand-yellow-dark dark:text-brand-yellow-light">Stack</span>
      </span>
      {showTagline ? (
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest ${
            onDark ? "text-brand-yellow-light/90" : "text-content-muted"
          } ${size === "sm" ? "hidden sm:block" : "mt-0.5"}`}
        >
          {TAGLINE}
        </span>
      ) : null}
    </div>
  );
}

export { TAGLINE };
