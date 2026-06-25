interface LogoMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-14 w-14 text-xl",
};

export function LogoMark({ size = "md", className = "" }: LogoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-brand font-display font-bold text-white shadow-glow ${sizes[size]} ${className}`}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-brand opacity-50 blur-md" />
      <span className="relative">B</span>
    </span>
  );
}
