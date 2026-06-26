"use client";

import { motion } from "framer-motion";

const FLOATING_ICONS = [
  { emoji: "🐱", x: "8%", y: "12%", delay: 0 },
  { emoji: "🎮", x: "78%", y: "8%", delay: 0.5 },
  { emoji: "🌟", x: "85%", y: "55%", delay: 1 },
  { emoji: "🎨", x: "5%", y: "65%", delay: 1.5 },
  { emoji: "🚀", x: "42%", y: "5%", delay: 0.8 },
] as const;

const SCRATCH_BLOCKS = [
  { color: "bg-orange-400", label: "when 🏁 clicked", width: "w-44" },
  { color: "bg-brand-yellow", label: "forever", width: "w-36", indent: true },
  { color: "bg-brand-green-light", label: "move 10 steps", width: "w-40", indent: true, nested: true },
  { color: "bg-blue-400", label: "play sound Meow", width: "w-44", indent: true, nested: true },
  { color: "bg-purple-400", label: "if touching edge", width: "w-40", indent: true },
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
              scratch.brainstack.studio
            </span>
          </div>

          <div className="mt-6 flex flex-1 flex-col gap-2">
            {SCRATCH_BLOCKS.map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className={`${block.width} rounded-lg ${block.color} py-2 pl-3 pr-4 font-mono text-xs font-semibold text-white shadow-md ${
                  "indent" in block && block.indent ? "ml-4" : ""
                } ${"nested" in block && block.nested ? "ml-8" : ""}`}
                style={{ borderRadius: "8px 8px 8px 4px" }}
              >
                {block.label}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface-muted/50 p-3">
            <span className="text-2xl">🐱</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-content">Sprite: Coding Cat</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="text-xs font-bold text-brand-green">85%</span>
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
    </div>
  );
}
