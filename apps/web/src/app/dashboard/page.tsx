"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { ScratchEditorFrame } from "@/components/learn/ScratchEditorFrame";
import { ScratchPracticePanel } from "@/components/learn/ScratchPracticePanel";
import {
  SCRATCH_PRACTICE_LESSONS,
  type ScratchPracticeLesson,
} from "@/lib/scratch-practice";

type DashboardTab = "overview" | "practice";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [activeRecording, setActiveRecording] = useState<ScratchPracticeLesson | null>(null);
  const [modalTab, setModalTab] = useState<"watch" | "practice">("watch");
  const [practiceClass, setPracticeClass] = useState(1);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="relative flex min-h-[70vh] items-center justify-center">
        <AnimatedBackground variant="minimal" />
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-pink border-t-transparent" />
          <p className="mt-4 text-content-muted">Loading your workspace...</p>
        </div>
      </main>
    );
  }

  function openRecording(lesson: ScratchPracticeLesson) {
    setActiveRecording(lesson);
    setModalTab("watch");
    setPracticeClass(lesson.classNumber);
  }

  function openPractice(classNumber: number) {
    setPracticeClass(classNumber);
    setActiveTab("practice");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="relative min-h-screen py-10">
      <AnimatedBackground variant="minimal" />

      <div className="site-container relative z-10">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Student Dashboard</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-content">
              Welcome back, <span className="gradient-text">{user.fullName}</span>!
            </h1>
            <p className="mt-1 text-sm text-content-muted">
              Active Course: <strong>Junior Game Dev: Scratch & Logic</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("practice")}
              className="btn-primary px-5 py-2.5 text-sm font-semibold shadow-glow"
            >
              🧩 Practice blocks
            </button>
            <button onClick={logout} className="btn-secondary px-4 py-2.5 text-sm font-semibold">
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2 border-b border-border">
          {(
            [
              { id: "overview" as const, label: "Overview" },
              { id: "practice" as const, label: "Block practice lab" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-brand-green text-brand-green"
                  : "border-transparent text-content-muted hover:text-content"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "practice" ? (
          <div className="mt-8">
            <ScratchPracticePanel initialClassNumber={practiceClass} />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="rounded-2xl border border-brand-pink/30 bg-brand-pink/5 p-6 shadow-glass">
                <span className="inline-flex rounded-md bg-brand-pink/10 px-2.5 py-1 text-xs font-bold uppercase text-brand-pink">
                  Live Session
                </span>
                <h2 className="mt-3 font-display text-xl font-bold text-content">
                  Class 5: Variables & Game Scoring Systems
                </h2>
                <p className="mt-2 text-sm text-content-muted">
                  Learn how to store points, track player lives, and create high-score leaderboards
                  in Scratch games.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-content-muted">
                  <span>📅 Sunday, June 28</span>
                  <span>⏰ 4:00 PM (GMT+6)</span>
                  <span>👤 Instructor: Labib Ahmed</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://zoom.us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-glow"
                  >
                    🎥 Join Live Class
                  </a>
                  <button
                    type="button"
                    onClick={() => openPractice(5)}
                    className="btn-secondary-coral px-6 py-3 text-sm font-bold"
                  >
                    🧩 Practice Class 5 blocks
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-content">
                  Previous Classes & Revision
                </h2>
                <p className="mt-1 text-sm text-content-muted">
                  Watch the recording, then practice the same blocks in the editor.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {SCRATCH_PRACTICE_LESSONS.filter((l) => l.classNumber > 0).map((lesson) => (
                    <div
                      key={lesson.classNumber}
                      className="glass-card flex flex-col justify-between p-5 transition-colors hover:border-brand-green/40"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-brand-green/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-green">
                            Class {lesson.classNumber}
                          </span>
                          <span className="text-xs text-content-faint">⏱️ {lesson.duration}</span>
                        </div>
                        <h3 className="mt-3 font-display text-base font-semibold leading-snug text-content">
                          {lesson.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-content-muted">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => openRecording(lesson)}
                          className="btn-secondary py-2 text-xs font-semibold"
                        >
                          ▶ Watch
                        </button>
                        <button
                          type="button"
                          onClick={() => openPractice(lesson.classNumber)}
                          className="btn-primary py-2 text-xs font-semibold"
                        >
                          🧩 Practice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="font-display text-lg font-bold text-content">Your Progress</h2>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-extrabold text-content">Level 2</p>
                    <p className="text-xs text-content-muted">Coders-in-Training</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-brand-pink">420 XP</p>
                    <p className="text-xs text-content-muted">80 XP to Level 3</p>
                  </div>
                </div>
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full border border-border bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="font-display text-lg font-bold text-content">Badges Earned</h2>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { emoji: "🎮", label: "First Game" },
                    { emoji: "🥷", label: "Code Ninja" },
                    { emoji: "🔄", label: "Loop Master" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="rounded-xl border border-border/50 bg-surface-muted/60 p-2.5"
                    >
                      <span className="text-2xl">{badge.emoji}</span>
                      <p className="mt-1 text-[10px] font-bold leading-tight text-content">
                        {badge.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="font-display text-lg font-bold text-content">Quick start</h2>
                <p className="mt-2 text-sm text-content-muted">
                  Jump straight into the block editor with a starter template.
                </p>
                <button
                  type="button"
                  onClick={() => openPractice(1)}
                  className="btn-primary mt-4 w-full py-3 text-sm font-semibold"
                >
                  🐱 Open block editor
                </button>
                <Link
                  href="/learn/scratch"
                  className="btn-secondary mt-2 block w-full py-3 text-center text-sm font-semibold"
                >
                  Full-screen playground →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeRecording ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-glow">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-muted px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  Class {activeRecording.classNumber}
                </span>
                <h3 className="font-display text-lg font-bold text-content">
                  {activeRecording.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalTab("watch")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    modalTab === "watch"
                      ? "bg-brand-green/15 text-brand-green"
                      : "text-content-muted hover:bg-surface"
                  }`}
                >
                  ▶ Recording
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab("practice")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    modalTab === "practice"
                      ? "bg-brand-pink/15 text-brand-pink"
                      : "text-content-muted hover:bg-surface"
                  }`}
                >
                  🧩 Practice blocks
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRecording(null)}
                  className="rounded-lg p-1.5 text-content-muted hover:bg-surface hover:text-content"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {modalTab === "watch" ? (
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`${activeRecording.videoUrl}?autoplay=1`}
                    title={activeRecording.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <ScratchEditorFrame lesson={activeRecording} compact />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
