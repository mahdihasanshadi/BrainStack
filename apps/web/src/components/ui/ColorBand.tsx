export function ColorBand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-2 sm:h-2.5 ${className}`}
      aria-hidden="true"
    >
      <span className="flex-1 bg-paddy" />
      <span className="flex-1 bg-turmeric" />
      <span className="flex-1 bg-rickshaw" />
      <span className="flex-1 bg-monsoon" />
    </div>
  );
}
