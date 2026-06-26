interface AccentTextProps {
  children: React.ReactNode;
  className?: string;
}

/** Programming Hero–style heading accent with trailing underscore */
export function AccentText({ children, className = "" }: AccentTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="ml-0.5 text-brand-yellow dark:text-brand-yellow-light"
      >
        _
      </span>
    </span>
  );
}
