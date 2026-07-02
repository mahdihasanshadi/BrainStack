"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURRICULUM = [
  {
    month: 1,
    emoji: "🟢",
    colorBar: "bg-emerald-500",
    colorBadge: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
    theme: "Control & Movement",
    subtitle: "The Street Rules — ডান বাম উপর নিচ",
    goal: "Understand sequencing, coordinates (X, Y), and basic event loops using Dhaka traffic logic.",
    badge: "Street Coder 🏎️",
    xp: 500,
    classes: [
      {
        num: 0,
        title: "Environment Setup",
        type: "setup",
        concept: "Set up Scratch online (free, no install). Create your first sprite and stage.",
        project: "Your sprite says your name — the first program you've ever written!",
        isShowcase: false,
      },
      {
        num: 1,
        title: "The Traffic Jam — Grid Layout",
        type: "lesson",
        concept: "X and Y coordinates, grid mapping, keyboard event listeners.",
        project: "Move a Rickshaw left-to-right with arrow keys. Hit the edge? It loops back to start.",
        isShowcase: false,
      },
      {
        num: 2,
        title: "The Continuous Motion — Loops",
        type: "lesson",
        concept: "Forever loop vs. Repeat (N) loop — when to use each.",
        project: "A CNG runs forever across the screen with spinning wheel costume animation.",
        isShowcase: false,
      },
      {
        num: 3,
        title: "Watch Out for the Gari! — Collision",
        type: "lesson",
        concept: "Sensor blocks: if touching [Sprite] then...",
        project: "Rickshaw vs. Bus: touch the bus → crash sound + game over. Avoid it and survive!",
        isShowcase: false,
      },
      {
        num: 4,
        title: "The Jumping Hero — Gravity Basics",
        type: "lesson",
        concept: "Changing Y coordinates quickly to simulate physical momentum.",
        project: "A Dhaka street kid jumps over waterlogged puddles by pressing Spacebar.",
        isShowcase: false,
      },
      {
        num: 5,
        title: "🎮 Showcase Day 1",
        type: "showcase",
        concept: "Polish your street game, add a start button, share it with parents.",
        project: "Parents receive a WhatsApp link to play YOUR game this weekend. First proud moment!",
        isShowcase: true,
      },
    ],
  },
  {
    month: 2,
    emoji: "🟡",
    colorBar: "bg-yellow-500",
    colorBadge: "border-yellow-500/40 bg-yellow-500/15 text-yellow-400",
    theme: "Decision Making & States",
    subtitle: "The Biryani Hunt — লুপ ও ভেরিয়েবল",
    goal: "Master conditionals (If/Else) and data storage (Variables).",
    badge: "Logic Chef 🍛",
    xp: 750,
    classes: [
      {
        num: 6,
        title: "The Food Critic — Inputs & Logic",
        type: "lesson",
        concept: "Ask and Wait blocks, checking string equality with If/Else.",
        project: "Type 'Kacchi' → character does a happy dance! Type anything else → sad face. First AI-like conversation!",
        isShowcase: false,
      },
      {
        num: 7,
        title: "The Infinite Eater — Variables",
        type: "lesson",
        concept: "Creating a variable box, updating values with 'Change by 1'.",
        project: "Fuchka Clicker — click the plate, count goes up, a crunchy eating sound plays!",
        isShowcase: false,
      },
      {
        num: 8,
        title: "The High-Score Shop — Boolean Operations",
        type: "lesson",
        concept: "Comparison operators: greater than (>), less than (<), equals (=).",
        project: "Upgrade the Fuchka game: score > 20 unlocks a secret Chutney Power-Up!",
        isShowcase: false,
      },
      {
        num: 9,
        title: "Load Shedding! — Timers & Decrements",
        type: "lesson",
        concept: "Countdown timers, subtracting numbers from variables.",
        project: "Timer hits 0 → screen goes black (কারেন্ট গেছে!). Click Pakha rapidly to survive!",
        isShowcase: false,
      },
      {
        num: 10,
        title: "🎮 Showcase Day 2",
        type: "showcase",
        concept: "Combine Fuchka Clicker + Load Shedding into one survival mega-game.",
        project: "Your first complete multi-mechanic game — parents can't believe their kid built this!",
        isShowcase: true,
      },
    ],
  },
  {
    month: 3,
    emoji: "🔴",
    colorBar: "bg-red-500",
    colorBadge: "border-red-500/40 bg-red-500/15 text-red-400",
    theme: "Game Mechanics & Math",
    subtitle: "The Cricket Match — বেসিক অ্যারিথমেটিক",
    goal: "Learn how sprites communicate using messaging and random values.",
    badge: "Game Architect 🏏",
    xp: 1000,
    classes: [
      {
        num: 11,
        title: "The Random Bowler — Randomization",
        type: "lesson",
        concept: "The 'pick random (1) to (10)' block — introducing unpredictability.",
        project: "Cricket bowler throws a ball — speed and direction randomized every delivery. Impossible to cheat!",
        isShowcase: false,
      },
      {
        num: 12,
        title: "Sixer or Out? — Complex Conditionals",
        type: "lesson",
        concept: "Nested If/Else blocks — decisions inside decisions.",
        project: "Tap at the perfect moment: 50% chance SIXER! 🎉 vs 50% chance CAUGHT OUT! 😱",
        isShowcase: false,
      },
      {
        num: 13,
        title: "The Crowded Stadium — Cloning",
        type: "lesson",
        concept: "'Create clone of myself' — memory management and iteration.",
        project: "Just 4 lines of code auto-generates an entire crowd of flag-waving supporters!",
        isShowcase: false,
      },
      {
        num: 14,
        title: "Over Change! — Scene Management",
        type: "lesson",
        concept: "Broadcast [Message] block — sprites talk to each other.",
        project: "After 6 balls: backdrop auto-switches from cricket pitch to scoreboard screen. Magic!",
        isShowcase: false,
      },
      {
        num: 15,
        title: "🎮 Showcase Day 3",
        type: "showcase",
        concept: "Finalize the 2D Mini-Cricket game with a working scoreboard.",
        project: "A fully playable cricket game with score, wickets, and overs — built entirely by the student!",
        isShowcase: true,
      },
    ],
  },
  {
    month: 4,
    emoji: "🔵",
    colorBar: "bg-violet-500",
    colorBadge: "border-violet-500/40 bg-violet-500/15 text-violet-400",
    theme: "The Independent Studio",
    subtitle: "Meta-Learning — শেখা কিভাবে শিখতে হয়",
    goal: "Learn professional clean code habits (Custom Blocks) and build your own original game from scratch.",
    badge: "Independent Dev 🚀",
    xp: 1500,
    classes: [
      {
        num: 16,
        title: "Don't Lazy Code! — Custom Blocks",
        type: "lesson",
        concept: "Creating 'My Blocks' to reuse scripts — the professional way to code.",
        project: "Build a [Jump Animation] custom block usable by ANY character in your game. No more copy-paste!",
        isShowcase: false,
      },
      {
        num: 17,
        title: "Game UI Design — User Experience",
        type: "lesson",
        concept: "Managing broadcast layers for menus and scene transitions.",
        project: "Start Screen → Character Select (Sakib or Tamim) → Gameplay. Feels like a real game studio made it!",
        isShowcase: false,
      },
      {
        num: 18,
        title: "Finding the Glitch — Debugging",
        type: "lesson",
        concept: "Code reviewing and error isolation — thinking like a real developer.",
        project: "Fix an intentionally broken game — kids become detectives hunting down the one wrong block!",
        isShowcase: false,
      },
      {
        num: 19,
        title: "🚀 BD Capstone Hackathon",
        type: "hackathon",
        concept: "Plan and begin building your original game from scratch.",
        project: "Choose your BD idea: King Khan chasing thieves, Mango-catching in Rajshahi, or Recycling Sorter!",
        isShowcase: false,
      },
      {
        num: 20,
        title: "🏆 The Grand Finale Showcase",
        type: "showcase",
        concept: "Live presentation — share your screen, explain your game, demo it live.",
        project: "Your original game. Your design. Your moment. Parents, friends, and the whole cohort watch YOU present.",
        isShowcase: true,
      },
    ],
  },
];

const TYPE_STYLES: Record<string, string> = {
  setup: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  lesson: "border-brand-green/30 bg-brand-green/10 text-brand-green-light",
  showcase: "border-brand-pink/30 bg-brand-pink/10 text-brand-pink",
  hackathon: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

const TYPE_LABELS: Record<string, string> = {
  setup: "Setup",
  lesson: "Lesson",
  showcase: "🎉 Showcase",
  hackathon: "🚀 Hackathon",
};

export function ScratchCurriculumSection() {
  const [openMonths, setOpenMonths] = useState<number[]>([1]);
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());

  function toggleMonth(month: number) {
    setOpenMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  }

  function toggleClass(key: string) {
    setExpandedClasses((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const totalXP = CURRICULUM.reduce((sum, m) => sum + m.xp, 0);

  return (
    <section id="curriculum" className="scroll-mt-24 py-20 sm:py-28 bg-brand-green-dark">
      <div className="site-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="eyebrow mx-auto">Full Curriculum</p>
          <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
            4 Months.{" "}
            <span className="gradient-text">20 Classes.</span> 4 Real Games.
          </h2>
          <p className="mt-4 text-lg text-content-muted max-w-2xl mx-auto">
            Every class ends with a project your child actually runs and plays.
            Every month ends with a Showcase Day the whole family can celebrate.
          </p>

          {/* Stats bar */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-6 rounded-2xl border border-brand-pink/20 bg-brand-pink/5 px-8 py-4 text-sm">
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-brand-pink">20</p>
              <p className="text-xs text-content-muted">Classes</p>
            </div>
            <div className="h-8 w-px bg-border self-center" />
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-brand-pink">4</p>
              <p className="text-xs text-content-muted">Real Games Built</p>
            </div>
            <div className="h-8 w-px bg-border self-center" />
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-brand-pink">4</p>
              <p className="text-xs text-content-muted">Showcase Days</p>
            </div>
            <div className="h-8 w-px bg-border self-center" />
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-brand-pink">
                {totalXP.toLocaleString()}
              </p>
              <p className="text-xs text-content-muted">XP to Earn</p>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {CURRICULUM.map((month) => {
            const isOpen = openMonths.includes(month.month);
            const totalClasses = month.classes.length;
            const showcaseDays = month.classes.filter((c) => c.isShowcase).length;

            return (
              <div
                key={month.month}
                className="overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-all duration-300"
              >
                {/* Month header */}
                <button
                  type="button"
                  onClick={() => toggleMonth(month.month)}
                  className="flex w-full items-center gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-surface-muted/30"
                  aria-expanded={isOpen}
                >
                  {/* Colored left bar */}
                  <div
                    className={`hidden sm:block h-16 w-1.5 rounded-full flex-shrink-0 ${month.colorBar}`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xl">{month.emoji}</span>
                      <span className="font-display text-lg font-extrabold text-content">
                        Month {month.month}: {month.theme}
                      </span>
                      <span
                        className={`rounded-pill border px-2.5 py-0.5 text-xs font-bold ${month.colorBadge}`}
                      >
                        {month.badge}
                      </span>
                    </div>
                    <p className="text-sm text-content-muted">{month.subtitle}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-content-faint">
                      <span>{totalClasses} classes</span>
                      <span>·</span>
                      <span>{showcaseDays} showcase day</span>
                      <span>·</span>
                      <span className="font-bold text-brand-pink">+{month.xp.toLocaleString()} XP</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className="hidden sm:block text-xs font-medium text-content-muted">
                      {isOpen ? "Collapse" : "Expand"}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-content-muted flex-shrink-0"
                    >
                      ↓
                    </motion.div>
                  </div>
                </button>

                {/* Month goal banner */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="border-t border-border">
                        <div className="mx-5 sm:mx-6 my-4 rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 px-4 py-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-light mb-1">
                            🎯 Monthly Goal
                          </p>
                          <p className="text-sm text-content-muted">{month.goal}</p>
                        </div>

                        {/* Class list */}
                        <div className="pb-4">
                          {month.classes.map((cls) => {
                            const key = `${month.month}-${cls.num}`;
                            const isExpanded = expandedClasses.has(key);

                            return (
                              <div key={cls.num} className="border-t border-border/50 first:border-t-0">
                                <button
                                  type="button"
                                  onClick={() => toggleClass(key)}
                                  className="flex w-full items-start gap-4 px-5 sm:px-6 py-4 text-left transition-colors hover:bg-surface-muted/20"
                                >
                                  {/* Class number */}
                                  <div
                                    className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${cls.isShowcase ? "bg-brand-pink text-white" : "border border-border bg-surface-muted text-content-faint"}`}
                                  >
                                    {cls.num}
                                  </div>

                                  {/* Content */}
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={`text-sm font-semibold ${cls.isShowcase ? "text-brand-pink" : "text-content"}`}
                                      >
                                        {cls.title}
                                      </span>
                                      <span
                                        className={`rounded-md border px-2 py-0.5 text-xs font-bold ${TYPE_STYLES[cls.type] ?? ""}`}
                                      >
                                        {TYPE_LABELS[cls.type] ?? cls.type}
                                      </span>
                                    </div>
                                  </div>

                                  <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-0.5 flex-shrink-0 text-xs text-content-faint"
                                  >
                                    ▾
                                  </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      key="detail"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mx-5 sm:mx-6 mb-4 ml-16 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 px-4 py-3">
                                          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-yellow-light">
                                            📚 Concept
                                          </p>
                                          <p className="text-sm text-content-muted">{cls.concept}</p>
                                        </div>
                                        <div className="rounded-xl border border-brand-pink/20 bg-brand-pink/5 px-4 py-3">
                                          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-pink">
                                            🎮 What They Build
                                          </p>
                                          <p className="text-sm text-content-muted">{cls.project}</p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 rounded-2xl border border-brand-pink/20 bg-brand-pink/5 p-6 text-center">
          <p className="text-sm font-semibold text-content">
            🎯 Our secret: we make the already-proven concepts contextual to Bangladeshi kids.
            Rickshaws, Fuchka, Cricket, Load Shedding — concepts they live, now concepts they code.
          </p>
          <p className="mt-2 text-xs text-content-muted">
            Logic is universal. Our delivery is unapologetically Bangladeshi. 🇧🇩
          </p>
        </div>
      </div>
    </section>
  );
}
