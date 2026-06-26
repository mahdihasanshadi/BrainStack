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
          // Primary: deep-to-bright purple
          green: "#7C3AED",        // purple-600
          "green-light": "#A855F7", // purple-500
          "green-dark": "#3B0764",  // purple-950

          // Accent: electric cyan / neon
          yellow: "#06B6D4",        // cyan-500
          "yellow-light": "#67E8F9", // cyan-300
          "yellow-dark": "#0891B2",  // cyan-600

          // Action: neon magenta-pink (the single button CTA color)
          pink: "#F72585",          // neon pink / magenta
          "pink-light": "#FF79C6",  // light pink
          "pink-dark": "#C9155E",   // dark pink

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
          "0 8px 32px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
        "glass-dark":
          "0 8px 32px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(168, 85, 247, 0.09)",
        glow: "0 0 40px rgba(168, 85, 247, 0.55)",
        "glow-yellow": "0 0 40px rgba(6, 182, 212, 0.55)",
        "glow-pink": "0 0 40px rgba(247, 37, 133, 0.65), 0 0 80px rgba(247, 37, 133, 0.3)",
        card: "0 4px 24px -4px rgba(124, 58, 237, 0.15)",
        "card-hover":
          "0 20px 60px -12px rgba(124, 58, 237, 0.32), 0 0 0 1px rgba(6, 182, 212, 0.22)",
        float: "0 24px 48px -12px rgba(124, 58, 237, 0.32)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #4C1D95 0%, #7C3AED 45%, #06B6D4 100%)",
        "gradient-brand-reverse":
          "linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #4C1D95 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #A855F7 0%, #06B6D4 100%)",
        // Light hero: subtle lavender glow
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(6, 182, 212, 0.1), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(250, 245, 255, 0.95), transparent 55%)",
        // Dark hero: strong neon purple glow with pink accent
        "gradient-hero-dark":
          "radial-gradient(ellipse 90% 70% at 50% -5%, rgba(124, 58, 237, 0.45), transparent 65%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(247, 37, 133, 0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(59, 7, 100, 0.7), transparent 60%)",
        // Circuit-board grid — tight purple lines
        "grid-pattern":
          "linear-gradient(rgba(124, 58, 237, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.07) 1px, transparent 1px)",
        "grid-pattern-dark":
          "linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
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
        pinkPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(247, 37, 133, 0.5)" },
          "50%": { boxShadow: "0 0 50px rgba(247, 37, 133, 0.9), 0 0 100px rgba(247, 37, 133, 0.4)" },
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
        "pink-pulse": "pinkPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
