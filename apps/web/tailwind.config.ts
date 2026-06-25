import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#15803D",
          "green-light": "#22C55E",
          "green-dark": "#14532D",
          yellow: "#EAB308",
          "yellow-light": "#FDE047",
          "yellow-dark": "#CA8A04",
          white: "#FFFFFF",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          elevated: "var(--surface-elevated)",
          glass: "var(--surface-glass)",
        },
        content: {
          DEFAULT: "var(--content)",
          muted: "var(--content-muted)",
          faint: "var(--content-faint)",
        },
        border: {
          DEFAULT: "var(--border)",
          glow: "var(--border-glow)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["4.5rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "hero-sm": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        section: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "section-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        subhead: ["1.25rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        site: "76rem",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(21, 128, 61, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        "glass-dark":
          "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px rgba(34, 197, 94, 0.35)",
        "glow-yellow": "0 0 40px rgba(234, 179, 8, 0.3)",
        card: "0 4px 24px -4px rgba(21, 128, 61, 0.12)",
        "card-hover":
          "0 20px 60px -12px rgba(21, 128, 61, 0.22), 0 0 0 1px rgba(234, 179, 8, 0.15)",
        float: "0 24px 48px -12px rgba(21, 128, 61, 0.25)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #15803D 0%, #22C55E 45%, #EAB308 100%)",
        "gradient-brand-reverse":
          "linear-gradient(135deg, #EAB308 0%, #22C55E 50%, #15803D 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #22C55E 0%, #FDE047 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34, 197, 94, 0.14), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(234, 179, 8, 0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(255, 255, 255, 0.9), transparent 55%)",
        "gradient-hero-dark":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34, 197, 94, 0.2), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(234, 179, 8, 0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(20, 83, 45, 0.4), transparent 55%)",
        "grid-pattern":
          "linear-gradient(rgba(21, 128, 61, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 128, 61, 0.05) 1px, transparent 1px)",
        "grid-pattern-dark":
          "linear-gradient(rgba(34, 197, 94, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
