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
          // Primary — logo blue ("Stack" + middle brain layer)
          green: "#3893F4",
          "green-light": "#5CA8F6",
          "green-dark": "#14233C",

          // Accent — logo yellow (bottom brain layer)
          yellow: "#FFCB3C",
          "yellow-light": "#FFD866",
          "yellow-dark": "#E6B635",

          // Accent — logo coral (top brain layer)
          pink: "#EF5D4A",
          "pink-light": "#F27868",
          "pink-dark": "#D94E3D",

          navy: "#14233C",
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
        glass:
          "0 8px 32px rgba(56, 147, 244, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-dark":
          "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(56, 147, 244, 0.12)",
        glow: "0 0 40px rgba(56, 147, 244, 0.45)",
        "glow-yellow": "0 0 40px rgba(255, 203, 60, 0.45)",
        "glow-pink": "0 0 40px rgba(239, 93, 74, 0.4)",
        card: "0 4px 24px -4px rgba(20, 35, 60, 0.08)",
        "card-hover":
          "0 20px 60px -12px rgba(56, 147, 244, 0.22), 0 0 0 1px rgba(255, 203, 60, 0.15)",
        float: "0 24px 48px -12px rgba(56, 147, 244, 0.25)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #EF5D4A 0%, #EF5D4A 33.33%, #3893F4 33.33%, #3893F4 66.66%, #FFCB3C 66.66%, #FFCB3C 100%)",
        "gradient-brand-reverse":
          "linear-gradient(135deg, #FFCB3C 0%, #3893F4 50%, #14233C 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #EF5D4A 0%, #FFCB3C 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 70% 55% at 15% 15%, rgba(239, 93, 74, 0.16), transparent 55%), radial-gradient(ellipse 70% 55% at 85% 20%, rgba(56, 147, 244, 0.16), transparent 55%), radial-gradient(ellipse 80% 50% at 50% 95%, rgba(255, 203, 60, 0.14), transparent 60%)",
        "gradient-hero-dark":
          "radial-gradient(ellipse 70% 55% at 15% 15%, rgba(239, 93, 74, 0.2), transparent 55%), radial-gradient(ellipse 70% 55% at 85% 20%, rgba(56, 147, 244, 0.22), transparent 55%), radial-gradient(ellipse 80% 50% at 50% 95%, rgba(255, 203, 60, 0.18), transparent 60%)",
        "grid-pattern":
          "linear-gradient(rgba(56, 147, 244, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 147, 244, 0.06) 1px, transparent 1px)",
        "grid-pattern-dark":
          "linear-gradient(rgba(56, 147, 244, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 147, 244, 0.1) 1px, transparent 1px)",
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
        circuitPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        brandPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(56, 147, 244, 0.4)" },
          "50%": { boxShadow: "0 0 50px rgba(56, 147, 244, 0.65), 0 0 80px rgba(56, 147, 244, 0.25)" },
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
        "circuit-pulse": "circuitPulse 4s ease-in-out infinite",
        "brand-pulse": "brandPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
