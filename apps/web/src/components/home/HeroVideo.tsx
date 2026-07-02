"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getLogoAccent } from "@/lib/logo-accents";
import {
  HERO_INTRO_VIDEO,
  heroIntroEmbedPlayUrl,
  resolveHeroIntroVideoSource,
} from "@/lib/hero-intro-video";

const videoSource = resolveHeroIntroVideoSource();

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-[5%] top-[10%] h-48 w-48 rounded-full bg-brand-pink/35 blur-3xl" />
        <div className="absolute right-[5%] top-[15%] h-48 w-48 rounded-full bg-brand-green/35 blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-48 w-48 rounded-full bg-brand-yellow/35 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-border relative"
      >
        <div className="gradient-border-inner overflow-hidden rounded-3xl">
          <div className="relative aspect-video w-full bg-brand-green-dark">
            {isPlaying && videoSource?.kind === "embed" ? (
              <iframe
                title={HERO_INTRO_VIDEO.title}
                src={heroIntroEmbedPlayUrl(videoSource.src)}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isPlaying && videoSource?.kind === "mp4" ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                poster={HERO_INTRO_VIDEO.poster}
              >
                <source src={videoSource.src} type="video/mp4" />
              </video>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,93,74,0.25),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(56,147,244,0.28),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(255,203,60,0.22),transparent_50%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
                  <motion.button
                    type="button"
                    aria-label={
                      videoSource
                        ? `Play ${HERO_INTRO_VIDEO.title}`
                        : "Introductory video placeholder"
                    }
                    onClick={() => videoSource && setIsPlaying(true)}
                    disabled={!videoSource}
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 text-3xl backdrop-blur-xl transition-transform hover:scale-105 disabled:cursor-default disabled:opacity-70"
                    whileHover={videoSource ? { scale: 1.05 } : undefined}
                    whileTap={videoSource ? { scale: 0.98 } : undefined}
                  >
                    ▶
                  </motion.button>
                  <div>
                    <p className="font-display text-lg font-bold">
                      {HERO_INTRO_VIDEO.title}
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-white/75">
                      {videoSource
                        ? HERO_INTRO_VIDEO.caption
                        : "Add your intro video URL to apps/web/.env.local — see NEXT_PUBLIC_HERO_INTRO_VIDEO_URL in .env.local.example."}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 rounded-pill bg-brand-yellow/90 px-3 py-1 text-xs font-bold text-brand-green-dark">
                  Intro video
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`absolute -bottom-4 -left-4 rounded-2xl border bg-surface-glass px-4 py-3 shadow-float backdrop-blur-xl ${getLogoAccent(1).cardBorder}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p className="text-xs font-semibold text-content-muted">Live classes</p>
        <p className={`font-display text-sm font-bold ${getLogoAccent(1).check}`}>
          Every week
        </p>
      </motion.div>

      <motion.div
        className={`absolute -right-4 top-8 rounded-2xl border bg-surface-glass px-4 py-3 shadow-float backdrop-blur-xl ${getLogoAccent(2).cardBorder}`}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-content-muted">Scratch + Logic</p>
        <p className={`font-display text-sm font-bold ${getLogoAccent(0).check}`}>
          Build & play
        </p>
      </motion.div>
    </div>
  );
}
