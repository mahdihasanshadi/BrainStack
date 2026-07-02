"use client";

import { motion } from "framer-motion";

/** Three equal blobs — coral, blue, yellow — matching logo proportions */
const BLOBS = [
  {
    className: "left-[6%] top-[8%] h-80 w-80 bg-brand-pink/28 dark:bg-brand-pink/32",
    animate: { x: [0, 28, 0], y: [0, -18, 0] },
    duration: 13,
  },
  {
    className: "right-[6%] top-[12%] h-80 w-80 bg-brand-green/28 dark:bg-brand-green/32",
    animate: { x: [0, -24, 0], y: [0, 22, 0] },
    duration: 15,
  },
  {
    className: "bottom-[6%] left-[38%] h-80 w-80 bg-brand-yellow/28 dark:bg-brand-yellow/32",
    animate: { x: [0, 18, 0], y: [0, -14, 0] },
    duration: 17,
  },
];

const PARTICLE_COLORS = [
  "bg-brand-green/45 dark:bg-brand-green/40",
  "bg-brand-pink/45 dark:bg-brand-pink/40",
  "bg-brand-yellow/55 dark:bg-brand-yellow/45",
] as const;

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.4,
  color: PARTICLE_COLORS[i % 3],
}));

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 3) % 100}%`,
  top: `${(i * 19 + 5) % 100}%`,
  delay: (i % 6) * 0.5,
  color: PARTICLE_COLORS[i % 3],
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
            : "bg-gradient-hero opacity-70 dark:bg-gradient-hero-dark dark:opacity-85"
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
              className={`absolute rounded-full ${p.color}`}
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ opacity: [0.25, 0.85, 0.25], y: [0, -8, 0] }}
              transition={{ duration: 3 + (p.id % 4), repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))
        : null}

      {showStars
        ? STARS.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute h-1 w-1 rounded-full ${star.color}`}
              style={{ left: star.left, top: star.top }}
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 2 + (star.id % 3), repeat: Infinity, delay: star.delay }}
            />
          ))
        : null}
    </div>
  );
}
