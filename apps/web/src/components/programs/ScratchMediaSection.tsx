"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const GALLERY = [
  {
    title: "Rickshaw Street Race",
    caption: "Month 1 — coordinates, loops & collision",
    emoji: "🏎️",
    gradient: "from-emerald-600/40 via-emerald-900/60 to-[#07000F]",
  },
  {
    title: "Fuchka Clicker Survival",
    caption: "Month 2 — variables & if/else logic",
    emoji: "🍡",
    gradient: "from-amber-500/40 via-orange-900/60 to-[#07000F]",
  },
  {
    title: "BD Cricket Championship",
    caption: "Month 3 — randomization & cloning",
    emoji: "🏏",
    gradient: "from-red-600/40 via-red-900/60 to-[#07000F]",
  },
  {
    title: "Grand Finale Showcase",
    caption: "Month 4 — kids demo their own game live",
    emoji: "🏆",
    gradient: "from-violet-600/40 via-purple-900/60 to-[#07000F]",
  },
  {
    title: "Live Class in Action",
    caption: "Small groups, real instructors, real projects",
    emoji: "👩‍🏫",
    gradient: "from-brand-pink/30 via-brand-green/20 to-[#07000F]",
  },
  {
    title: "Parent Showcase Day",
    caption: "Families play games built by their kids",
    emoji: "👨‍👩‍👧",
    gradient: "from-cyan-500/30 via-brand-green/20 to-[#07000F]",
  },
];

/** Replace with your hosted preview URL when ready. */
const PREVIEW_VIDEO_URL =
  "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1";

export function ScratchMediaSection() {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-[#07000F]">
      <div className="site-container">
        {/* Video */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mx-auto">See it in action</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Watch how{" "}
              <span className="gradient-text">BrainStack teaches</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-content-muted">
              A quick look at live classes, Scratch projects, and the kind of games
              your child will proudly show the whole family.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-brand-pink/30 bg-[#0D0020] shadow-[0_0_60px_rgba(247,37,133,0.18)]"
          >
            <div className="relative aspect-video w-full bg-black">
              <iframe
                title="BrainStack course preview video"
                src={PREVIEW_VIDEO_URL}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-pink/20 px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-bold text-content">Course preview</p>
                <p className="text-xs text-content-muted">
                  2 min · Live classes · Scratch projects · Parent showcase
                </p>
              </div>
              <span className="rounded-pill border border-brand-pink/30 bg-brand-pink/10 px-3 py-1 text-xs font-bold text-brand-pink">
                ▶ Free to watch
              </span>
            </div>
          </motion.div>
        </div>

        {/* Photo gallery */}
        <div>
          <div className="mb-10 text-center">
            <p className="eyebrow mx-auto">Inside the program</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Photos from{" "}
              <span className="gradient-text">real learning moments</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-content-muted">
              Every month ends with a project kids can run, share, and celebrate —
              not worksheets, but playable games.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((photo, index) => (
              <motion.button
                key={photo.title}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onClick={() => setActivePhoto(index)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                  activePhoto === index
                    ? "border-brand-pink/60 shadow-[0_0_40px_rgba(247,37,133,0.25)]"
                    : "border-border hover:border-brand-pink/40"
                }`}
              >
                <div
                  className={`relative flex aspect-[4/3] items-end bg-gradient-to-br p-5 ${photo.gradient}`}
                >
                  <span className="absolute right-4 top-4 text-4xl opacity-80 transition-transform group-hover:scale-110">
                    {photo.emoji}
                  </span>
                  <div className="relative">
                    <p className="font-display text-lg font-bold text-white">
                      {photo.title}
                    </p>
                    <p className="mt-1 text-sm text-purple-200">{photo.caption}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activePhoto}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden rounded-2xl border border-brand-pink/25 bg-surface-elevated"
          >
            <div
              className={`flex min-h-[220px] items-center justify-center bg-gradient-to-br px-8 py-10 ${GALLERY[activePhoto].gradient}`}
            >
              <div className="text-center">
                <span className="text-6xl">{GALLERY[activePhoto].emoji}</span>
                <p className="mt-4 font-display text-2xl font-extrabold text-white">
                  {GALLERY[activePhoto].title}
                </p>
                <p className="mt-2 max-w-lg text-content-muted text-purple-100">
                  {GALLERY[activePhoto].caption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
