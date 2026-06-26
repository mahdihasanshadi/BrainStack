"use client";

import { motion } from "framer-motion";

const BRAND_VIDEO_URL = process.env.NEXT_PUBLIC_BRAND_VIDEO_URL;

export function HeroVideo() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-border relative"
      >
        <div className="gradient-border-inner overflow-hidden rounded-3xl">
          {BRAND_VIDEO_URL ? (
            <video
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/brand-video-poster.jpg"
            >
              <source src={BRAND_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <div className="relative aspect-video w-full bg-brand-green-dark/90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.35),transparent_55%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
                <motion.button
                  type="button"
                  aria-label="Play brand video placeholder"
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 text-3xl backdrop-blur-xl transition-transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ▶
                </motion.button>
                <div>
                  <p className="font-display text-lg font-bold">BrainStack Brand Film</p>
                  <p className="mt-1 text-sm text-white/70">
                    Your hero video goes here — set{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                      NEXT_PUBLIC_BRAND_VIDEO_URL
                    </code>
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-pill bg-brand-yellow/90 px-3 py-1 text-xs font-bold text-brand-green-dark">
                X-Factor · Brand Video
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-surface-glass px-4 py-3 shadow-float backdrop-blur-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p className="text-xs font-semibold text-content-muted">Live classes</p>
        <p className="font-display text-sm font-bold text-content">Every week</p>
      </motion.div>

      <motion.div
        className="absolute -right-4 top-8 rounded-2xl border border-border bg-surface-glass px-4 py-3 shadow-float backdrop-blur-xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-content-muted">Scratch + Logic</p>
        <p className="font-display text-sm font-bold text-content">Build & play</p>
      </motion.div>
    </div>
  );
}
