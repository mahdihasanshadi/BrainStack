"use client";

import { motion } from "framer-motion";

const GAMES = [
  {
    month: "Month 1",
    title: "The Dhaka Street Race",
    description:
      "A Rickshaw dodges a wild Bus on a Dhaka grid. Controls: arrow keys. Mechanics: X/Y coordinates, collision detection, looping. First real game — parents actually want to play it.",
    emoji: "🏎️",
    color: "from-emerald-600/30 to-emerald-900/50",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
    tags: ["Coordinates", "Loops", "Collision", "Events"],
    badge: "Month 1 Project",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    month: "Month 2",
    title: "Fuchka Clicker Survival",
    description:
      "Click Fuchka plates to score. Hit 20+ to unlock a Chutney Power-Up. Then — Load Shedding hits! The screen goes black. Click Pakha furiously to bring comfort back.",
    emoji: "🍡",
    color: "from-yellow-600/30 to-orange-900/50",
    border: "border-yellow-500/30",
    accent: "text-yellow-400",
    tags: ["Variables", "If/Else", "Timers", "Game States"],
    badge: "Month 2 Project",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    month: "Month 3",
    title: "BD Cricket Championship",
    description:
      "A randomized bowler fires unpredictable deliveries. Time your bat perfectly — 50% chance of a Sixer, 50% Caught Out. A fully functional scoreboard tracks runs across overs.",
    emoji: "🏏",
    color: "from-red-600/30 to-red-900/50",
    border: "border-red-500/30",
    accent: "text-red-400",
    tags: ["Randomization", "Cloning", "Broadcast", "Scoreboard"],
    badge: "Month 3 Project",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    month: "Month 4",
    title: "Your Original BD Game",
    description:
      "The crown achievement: kids choose their own idea — King Khan chasing thieves, a Mango-catching game in Rajshahi, or a recycling sorter. Fully original, fully theirs.",
    emoji: "🚀",
    color: "from-violet-600/30 to-violet-900/50",
    border: "border-violet-500/30",
    accent: "text-violet-400",
    tags: ["Custom Blocks", "UI Design", "Debugging", "Capstone"],
    badge: "Grand Finale Project",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  },
];

const SKILLS_LEARNED = [
  { icon: "🧠", title: "Logical Thinking", desc: "Breaking problems into small, solvable steps" },
  { icon: "🔁", title: "Loops & Variables", desc: "Automating repetition and storing game state" },
  { icon: "🤔", title: "Conditionals", desc: "Making games that react to player decisions" },
  { icon: "🐛", title: "Debugging", desc: "Finding and fixing errors like a real developer" },
  { icon: "🎨", title: "Game Design", desc: "Building UI, scenes, and player experiences" },
  { icon: "🏗️", title: "Clean Code Habits", desc: "Writing reusable blocks instead of copy-pasting" },
  { icon: "🤝", title: "Problem Solving", desc: "Tackling new challenges with confidence" },
  { icon: "🎤", title: "Presentation Skills", desc: "Demoing your game live in front of an audience" },
];

export function ScratchWhatYouBuild() {
  return (
    <>
      {/* ── What You'll Build ── */}
      <section className="py-20 sm:py-28 bg-surface-muted/20">
        <div className="site-container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Hands-On Learning</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              4 Games Your Child Will{" "}
              <span className="gradient-text">Actually Build</span>
            </h2>
            <p className="mt-4 text-lg text-content-muted max-w-2xl mx-auto">
              No textbooks. No boring exercises. Every month ends with a playable game
              your child built themselves — and can show off to anyone.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl border ${game.border} bg-gradient-to-br ${game.color} p-6 backdrop-blur-sm`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={`rounded-pill border px-2.5 py-1 text-xs font-bold ${game.badgeColor}`}
                  >
                    {game.badge}
                  </span>
                  <span className="text-5xl">{game.emoji}</span>
                </div>

                <h3 className="font-display text-xl font-extrabold text-content">
                  {game.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {game.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Learned ── */}
      <section className="py-20 sm:py-24 bg-[#07000F]">
        <div className="site-container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Skills That Last a Lifetime</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Not Just Scratch.{" "}
              <span className="gradient-text">Real Thinking Skills.</span>
            </h2>
            <p className="mt-4 text-lg text-content-muted max-w-2xl mx-auto">
              {"We don't reinvent the wheel — we make the proven stuff meaningful for BD kids."}
              {"The logic your child learns here transfers to any programming language forever."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS_LEARNED.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-surface-elevated p-5 text-center transition-all duration-300 hover:border-brand-pink/40 hover:shadow-[0_0_30px_rgba(247,37,133,0.12)]"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-pink/20 bg-brand-pink/10 text-2xl">
                  {skill.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-content">{skill.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-content-muted">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
