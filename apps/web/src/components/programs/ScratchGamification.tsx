"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TRIAL_REGISTRATION_PATH } from "@/components/layout/nav-links";

const BADGES = [
  { emoji: "🏎️", name: "Street Coder", month: 1, desc: "Awarded after Month 1 Showcase", color: "from-emerald-500 to-green-700" },
  { emoji: "🍛", name: "Logic Chef", month: 2, desc: "Awarded after Month 2 Showcase", color: "from-yellow-500 to-orange-700" },
  { emoji: "🏏", name: "Game Architect", month: 3, desc: "Awarded after Month 3 Showcase", color: "from-red-500 to-pink-700" },
  { emoji: "🚀", name: "Independent Dev", month: 4, desc: "Awarded at the Grand Finale", color: "from-violet-500 to-purple-900" },
];

const REWARDS = [
  {
    icon: "💎",
    title: "Gem System",
    description:
      "Earn gems for completing classes, submitting assignments on time, and helping classmates. Spend gems to unlock bonus challenges and early access to Month 2+.",
    color: "border-cyan-500/30 bg-cyan-500/10",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
  },
  {
    icon: "🔥",
    title: "Streak Bonus",
    description:
      "Attend 3 classes in a row? Double XP. Attend all 5 in a month? Triple XP. Missing breaks the streak — so kids stay consistent and motivated.",
    color: "border-orange-500/30 bg-orange-500/10",
    iconBg: "bg-orange-500/20 border-orange-500/30",
  },
  {
    icon: "🏅",
    title: "Monthly Badges",
    description:
      "Four beautifully designed badges for four months. Shareable on WhatsApp. Each badge tells the world what your child built and what skill they mastered.",
    color: "border-yellow-500/30 bg-yellow-500/10",
    iconBg: "bg-yellow-500/20 border-yellow-500/30",
  },
  {
    icon: "🏆",
    title: "Leaderboard",
    description:
      "A friendly class leaderboard tracks XP — but our philosophy is to reward effort, not just output. Showing up consistently matters more than being the 'smartest'.",
    color: "border-brand-pink/30 bg-brand-pink/10",
    iconBg: "bg-brand-pink/20 border-brand-pink/30",
  },
  {
    icon: "🔓",
    title: "Unlock System",
    description:
      "High-gem students get early access to Month 2 materials, bonus Scratch projects, and exclusive challenge levels. Progress unlocks rewards — not just the calendar.",
    color: "border-violet-500/30 bg-violet-500/10",
    iconBg: "bg-violet-500/20 border-violet-500/30",
  },
  {
    icon: "📊",
    title: "Parent Dashboard",
    description:
      "Parents get a weekly WhatsApp progress summary: classes attended, XP earned, gems collected, and the next milestone. You always know where your child stands.",
    color: "border-green-500/30 bg-green-500/10",
    iconBg: "bg-green-500/20 border-green-500/30",
  },
];

const REVIEWS = [
  {
    name: "Rima Akter",
    role: "Parent of Arif (age 10)",
    text: "Arif stays up at night asking to code 'just one more game'. I used to beg him to do homework — now I beg him to go to sleep. BrainStack changed everything.",
    stars: 5,
    avatar: "👩",
  },
  {
    name: "Sabbir Hossain",
    role: "Parent of Mim (age 12)",
    text: "My daughter made a cricket game and sent the link to her dadu. He played it for 20 minutes. When she explained how she made it, I cried. Worth every taka.",
    stars: 5,
    avatar: "👨",
  },
  {
    name: "Nasrin Begum",
    role: "Parent of Rafiq (age 9)",
    text: "The Fuchka Clicker game — Rafiq made his cousins play it at Eid. They didn't believe a 9-year-old made it. He's been coding seriously ever since.",
    stars: 5,
    avatar: "👩",
  },
  {
    name: "Karim Chowdhury",
    role: "Parent of Sara (age 11)",
    text: "Sara was shy about technology. Now she explains 'if-else blocks' to her older brother. The BD context makes everything click — Rickshaws and Cricket aren't foreign to her.",
    stars: 5,
    avatar: "👨",
  },
];

const FAQ = [
  {
    q: "Do they need any coding experience?",
    a: "Absolutely none. Scratch uses visual drag-and-drop blocks — no typing, no syntax errors. Class 0 starts from opening a browser. If they can click, they can code.",
  },
  {
    q: "What device do they need?",
    a: "Any computer or tablet with a modern browser and internet connection. Scratch is 100% browser-based — no downloads, no installations, no cost.",
  },
  {
    q: "Is the class in Bangla or English?",
    a: "Both! Our instructors are bilingual and switch naturally based on what clicks best for each student. The curriculum uses Bangladeshi context (Rickshaws, Cricket, Fuchka) to make concepts immediately relatable.",
  },
  {
    q: "What if we miss a class?",
    a: "No worries. Every live class is recorded and shared with the family within 24 hours. Students can catch up at their own pace, and instructors do quick recaps at the start of each class.",
  },
  {
    q: "Is there homework?",
    a: "Yes, but fun homework. Each class has a small optional challenge project. Completing it earns gems and bonus XP. We deliberately designed it so it doesn't feel like 'school work'.",
  },
  {
    q: "What happens after 4 months?",
    a: "Students graduate with a certificate and 4 portfolio games. We plan advanced tracks (web development, Python, game engines) — and the foundational logic they've built transfers perfectly.",
  },
];

export function ScratchGamification() {
  return (
    <>
      {/* ── Gamification ── */}
      <section className="py-20 sm:py-28 bg-surface-muted/10">
        <div className="site-container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Built-In Motivation System</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Games That{" "}
              <span className="gradient-text">Reward the Learner</span>
            </h2>
            <p className="mt-4 text-lg text-content-muted max-w-2xl mx-auto">
              We incentivize the process, not just the outcome. Consistent effort
              — showing up, trying hard, helping others — is what earns the rewards.
            </p>
          </div>

          {/* Reward cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REWARDS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-2xl border p-5 ${r.color}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${r.iconBg}`}
                >
                  {r.icon}
                </div>
                <h3 className="font-display text-base font-bold text-content">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">{r.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges showcase */}
          <div className="mt-16">
            <h3 className="mb-8 text-center font-display text-2xl font-extrabold text-content">
              Earn All 4 Milestone Badges 🏅
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center rounded-2xl border border-border bg-surface-elevated p-5 text-center"
                >
                  <div
                    className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-4xl shadow-lg ${badge.color}`}
                  >
                    {badge.emoji}
                  </div>
                  <p className="font-display text-sm font-bold text-content">{badge.name}</p>
                  <p className="mt-1 text-xs text-content-muted">Month {badge.month}</p>
                  <p className="mt-1 text-xs text-content-faint">{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Parent Reviews ── */}
      <section className="py-20 sm:py-24 bg-[#07000F]">
        <div className="site-container">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">Parent Reviews</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              What Parents Are{" "}
              <span className="gradient-text">Saying</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <motion.blockquote
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-surface-elevated p-6"
              >
                <div className="mb-3 text-yellow-400">{"★".repeat(r.stars)}</div>
                <p className="text-sm leading-relaxed text-content-muted italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted text-xl">
                    {r.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-content">{r.name}</p>
                    <p className="text-xs text-content-muted">{r.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24 bg-surface-muted/20">
        <div className="site-container max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto">FAQs</p>
            <h2 className="mt-4 font-display text-section-sm font-extrabold text-content sm:text-section">
              Parents Ask.{" "}
              <span className="gradient-text">We Answer.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border border-border bg-surface-elevated p-6"
              >
                <h3 className="font-display text-base font-bold text-content">
                  <span className="mr-2 text-brand-pink">Q:</span>
                  {item.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-content-muted">
                  <span className="font-semibold text-content">A:</span> {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-28 bg-[#07000F] relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink/12 blur-[120px]" />
        </div>

        <div className="site-container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow mx-auto mb-4">Ready to Start?</p>
            <h2 className="font-display text-section-sm font-extrabold text-content sm:text-section">
              {"Your Child's First Game"}{" "}
              <span className="gradient-text">is One Click Away</span>
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-lg text-content-muted">
              Book a free trial class — no commitment, no payment needed.
              Let your child experience the magic of building their first program.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href={TRIAL_REGISTRATION_PATH} className="btn-primary px-10 py-4 text-base">
                🚀 Book Free Trial Class
              </Link>
              <Link href="/webinar" className="btn-secondary px-8 py-4 text-base">
                Attend Parent Info Session
              </Link>
            </div>

            <p className="mt-5 text-xs text-content-faint">
              No credit card required · Takes 2 minutes · Taught by real instructors
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
