"use client";

import { motion } from "framer-motion";

const BLOBS = [
  {
    className: "left-[5%] top-[10%] h-80 w-80 bg-brand-green/25 dark:bg-brand-green/30",
    animate: { x: [0, 30, 0], y: [0, -20, 0] },
    duration: 12,
  },
  {
    className: "right-[10%] top-[20%] h-96 w-96 bg-brand-green-dark/30 dark:bg-brand-green/20",
    animate: { x: [0, -25, 0], y: [0, 30, 0] },
    duration: 15,
  },
  {
    className: "bottom-[10%] left-[30%] h-80 w-80 bg-brand-yellow/15 dark:bg-brand-yellow/20",
    animate: { x: [0, 20, 0], y: [0, -15, 0] },
    duration: 18,
  },
  {
    className: "bottom-[20%] right-[20%] h-64 w-64 bg-brand-green-light/15 dark:bg-brand-yellow-light/10",
    animate: { x: [0, -15, 0], y: [0, 20, 0] },
    duration: 14,
  },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.4,
}));

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 3) % 100}%`,
  top: `${(i * 19 + 5) % 100}%`,
  delay: (i % 6) * 0.5,
}));

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "minimal";
  showGrid?: boolean;
  showStars?: boolean;
}

export function AnimatedBackground({
  variant = "section",
  showGrid = false,
  showStars = false,
}: AnimatedBackgroundProps) {
  const showParticles = variant !== "minimal";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          variant === "hero"
            ? "bg-gradient-hero dark:bg-gradient-hero-dark"
            : "bg-gradient-hero opacity-60 dark:bg-gradient-hero-dark dark:opacity-80"
        }`}
      />

      {showGrid ? (
        <div className="absolute inset-0 bg-grid-pattern bg-grid dark:bg-grid-pattern-dark" />
      ) : null}

      {BLOBS.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {showParticles
        ? PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-brand-green/35 dark:bg-brand-yellow-light/25"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -8, 0] }}
              transition={{ duration: 3 + (p.id % 4), repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))
        : null}

      {/* Circuit-board-style glowing dots in dark mode */}
      {showParticles
        ? PARTICLES.filter((_, i) => i % 3 === 0).map((p) => (
            <motion.div
              key={`circuit-${p.id}`}
              className="absolute hidden rounded-sm bg-brand-yellow/50 dark:block"
              style={{ left: p.left, top: p.top, width: 1, height: 1 + (p.id % 4) * 6 }}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 2 + (p.id % 3), repeat: Infinity, delay: p.delay * 1.5, ease: "easeInOut" }}
            />
          ))
        : null}

      {showStars
        ? STARS.map((star) => (
            <motion.div
              key={star.id}
              className="absolute h-px w-px rounded-full bg-brand-yellow-light/70 dark:bg-brand-yellow-light/90"
              style={{ left: star.left, top: star.top }}
              animate={{ opacity: [0.1, 1, 0.1] }}
              transition={{ duration: 2 + (star.id % 3), repeat: Infinity, delay: star.delay }}
            />
          ))
        : null}
    </div>
  );
}
