interface StatCardProps {
  label: string;
  value: number | string;
  hint?: string;
  accent?: "pink" | "green" | "yellow";
}

const ACCENTS = {
  pink: "border-brand-pink/30 bg-brand-pink/10 text-brand-pink-light",
  green: "border-brand-green/30 bg-brand-green/10 text-brand-green-light",
  yellow: "border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow-light",
} as const;

export function StatCard({
  label,
  value,
  hint,
  accent = "green",
}: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-5 ${ACCENTS[accent]}`}>
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-extrabold text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-white/60">{hint}</p> : null}
    </div>
  );
}
