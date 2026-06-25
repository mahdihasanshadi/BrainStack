"use client";

import { motion } from "framer-motion";

const FLOATING_ICONS = [
  { emoji: "🤖", x: "8%", y: "12%", delay: 0 },
  { emoji: "💡", x: "78%", y: "8%", delay: 0.5 },
  { emoji: "🪐", x: "85%", y: "55%", delay: 1 },
  { emoji: "⚡", x: "5%", y: "65%", delay: 1.5 },
  { emoji: "🧠", x: "42%", y: "5%", delay: 0.8 },
] as const;

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-20 blur-3xl" />

      <motion.div
        className="absolute inset-4 rounded-3xl border border-border bg-surface-glass shadow-float backdrop-blur-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-brand-yellow" />
            <span className="ml-3 font-mono text-xs text-content-faint">
              brainstack.studio
            </span>
          </div>

          <div className="mt-6 flex-1 space-y-3 font-mono text-sm">
            <p>
              <span className="text-brand-green-dark">function</span>{" "}
              <span className="text-brand-yellow-light">buildFuture</span>
              <span className="text-content-muted">() {"{"}</span>
            </p>
            <p className="pl-4">
              <span className="text-brand-green">const</span> learner ={" "}
              <span className="text-brand-yellow">&quot;curious&quot;</span>;
            </p>
            <p className="pl-4">
              <span className="text-brand-green">return</span> create(
              <span className="text-brand-yellow-light">game</span>,{" "}
              <span className="text-brand-yellow-light">story</span>,{" "}
              <span className="text-brand-yellow-light">dream</span>);
            </p>
            <p className="text-content-muted">{"}"}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-brand"
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-semibold text-brand-yellow">78%</span>
          </div>
        </div>
      </motion.div>

      {FLOATING_ICONS.map((icon) => (
        <motion.div
          key={icon.emoji}
          className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-glass text-xl shadow-glass backdrop-blur-xl sm:h-14 sm:w-14 sm:text-2xl"
          style={{ left: icon.x, top: icon.y }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 5 + icon.delay,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-[15%] left-[20%] h-24 w-24 rounded-full bg-brand-green-dark/30 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[15%] top-[25%] h-32 w-32 rounded-full bg-brand-yellow-light/25 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-20 dark:opacity-30"
        viewBox="0 0 400 400"
        fill="none"
      >
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          stroke="url(#ring)"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="400" y2="400">
            <stop stopColor="#15803D" />
            <stop offset="0.5" stopColor="#22C55E" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
