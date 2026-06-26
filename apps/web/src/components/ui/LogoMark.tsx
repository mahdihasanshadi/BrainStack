interface LogoMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

export function LogoMark({ size = "md", className = "" }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 85"
      fill="none"
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {/* Top Layer (Red/Coral) */}
      <path
        d="M 22,36 C 22,23 30,15 42,15 C 45.5,15 48,16.5 50,18 C 52,16.5 54.5,15 58,15 C 70,15 78,23 78,36 Z"
        fill="#EF5D4A"
      />

      {/* Bottom Layer (Yellow) */}
      <path
        d="M 22,48 C 22,61 30,69 42,69 C 45.5,69 48,67.5 50,66 C 52,67.5 54.5,69 58,69 C 70,69 78,61 78,48 Z"
        fill="#FFCB3C"
      />

      {/* Middle Layer (Blue) */}
      <rect
        x="15"
        y="35.5"
        width="70"
        height="13"
        rx="6.5"
        fill="#3893F4"
      />

      {/* Circuit lines & nodes */}
      {/* 1. Left yellow to blue connector */}
      <path
        d="M 32,58 V 44 H 46"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="58" r="2.5" fill="#14233C" />
      <circle cx="46" cy="44" r="2.5" fill="#14233C" />

      {/* 2. Top center plus sign */}
      <path
        d="M 50,22 V 26 M 48,24 H 52"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 3. Left-to-center curved loop */}
      <path
        d="M 38,28 C 36,20 44,18 48,20"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 4. Right side vertical connector */}
      <path
        d="M 64,24 V 42"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="64" cy="24" r="2.5" fill="#14233C" />
      <circle cx="64" cy="42" r="2.5" fill="#14233C" />

      {/* 5. Right curved decoration */}
      <path
        d="M 72,38 C 76,42 70,52 74,56"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 6. Bottom center node line */}
      <path
        d="M 60,52 H 52"
        stroke="#14233C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="52" r="2.5" fill="#14233C" />
    </svg>
  );
}
