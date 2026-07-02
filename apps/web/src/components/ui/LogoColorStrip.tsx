interface LogoColorStripProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const HEIGHT = { sm: "h-1", md: "h-1.5", lg: "h-2" } as const;

/** Three equal bands matching the logo stack: coral · blue · yellow */
export function LogoColorStrip({ className = "", size = "md" }: LogoColorStripProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-full overflow-hidden rounded-full ${HEIGHT[size]} ${className}`}
    >
      <div className="h-full flex-1 bg-brand-pink" />
      <div className="h-full flex-1 bg-brand-green" />
      <div className="h-full flex-1 bg-brand-yellow" />
    </div>
  );
}
