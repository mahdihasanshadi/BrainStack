"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

interface ClassRecording {
  id: string;
  classNumber: number;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  isUnlocked: boolean;
}

const PREVIOUS_CLASSES: ClassRecording[] = [
  {
    id: "rec_1",
    classNumber: 1,
    title: "Introduction to Scratch & Sprite Coordinates",
    description: "Learn how the 2D grid works, drag blocks, and make sprites move in response to user inputs.",
    duration: "45 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isUnlocked: true,
  },
  {
    id: "rec_2",
    classNumber: 2,
    title: "Understanding Loops, Control & Directions",
    description: "Explore forever and repeat loops to animate characters, make loops repeat dynamically, and control directions.",
    duration: "52 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isUnlocked: true,
  },
  {
    id: "rec_3",
    classNumber: 3,
    title: "Key Press Events & Sound Integration",
    description: "Create keyboard controls, play musical sound effects, and design simple obstacle detection mechanics.",
    duration: "48 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isUnlocked: true,
  },
  {
    id: "rec_4",
    classNumber: 4,
    title: "Sprite Interactions & Broadcast Messages",
    description: "Coordinate actions between different sprites using message broadcasting, and build level transitions.",
    duration: "55 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isUnlocked: true,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [activeRecording, setActiveRecording] = useState<ClassRecording | null>(null);

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

  return (
    <main className="relative min-h-screen py-10">
      <AnimatedBackground variant="minimal" />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
          <div>
            <p className="eyebrow">Student Dashboard</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-content">
              Welcome back, <span className="gradient-text">{user.fullName}</span>!
            </h1>
            <p className="text-sm text-content-muted mt-1">
              Active Course: <strong>Junior Game Dev: Scratch & Logic</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/learn/scratch" className="btn-primary px-5 py-2.5 shadow-glow text-sm font-semibold">
              🐱 Open Scratch Playground
            </Link>
            <button onClick={logout} className="btn-secondary px-4 py-2.5 text-sm font-semibold">
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main learning list */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Class Schedule Card */}
            <div className="rounded-2xl border border-brand-pink/30 bg-brand-pink/5 p-6 shadow-glass">
              <span className="inline-flex rounded-md bg-brand-pink/10 px-2.5 py-1 text-xs font-bold uppercase text-brand-pink">
                Live Session
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-content">
                Class 5: Variables & Game Scoring Systems
              </h2>
              <p className="mt-2 text-sm text-content-muted">
                Learn how to store points, track player lives, and create high-score leaderboards in Scratch games.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-content-muted">
                <span className="flex items-center gap-1.5">
                  📅 Sunday, June 28
                </span>
                <span className="flex items-center gap-1.5">
                  ⏰ 4:00 PM (GMT+6)
                </span>
                <span className="flex items-center gap-1.5">
                  👤 Instructor: Labib Ahmed
                </span>
              </div>
              <div className="mt-6">
                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-glow"
                >
                  🎥 Join Live Class (Zoom)
                </a>
              </div>
            </div>

            {/* Previous Class Recordings (Catch Up / Revision) */}
            <div>
              <h2 className="font-display text-2xl font-bold text-content">
                Previous Classes & Revision Recordings
              </h2>
              <p className="text-sm text-content-muted mt-1">
                Missed a class or need to revise? Watch video recordings and recreate the coding challenges.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {PREVIOUS_CLASSES.map((recording) => (
                  <div
                    key={recording.id}
                    className="glass-card p-5 flex flex-col justify-between hover:border-brand-green/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">
                          Class {recording.classNumber}
                        </span>
                        <span className="text-xs text-content-faint">
                          ⏱️ {recording.duration}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display font-semibold text-content text-base leading-snug">
                        {recording.title}
                      </h3>
                      <p className="mt-2 text-xs text-content-muted leading-relaxed">
                        {recording.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveRecording(recording)}
                      className="btn-secondary mt-5 w-full py-2 text-xs font-semibold"
                    >
                      ▶ Watch Recording
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (XP & Badges) */}
          <div className="space-y-6">
            {/* Gamification Stats */}
            <div className="glass-card p-6">
              <h2 className="font-display text-lg font-bold text-content">
                Your Progress
              </h2>
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
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-muted border border-border">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green" style={{ width: "70%" }}></div>
              </div>
            </div>

            {/* Badges */}
            <div className="glass-card p-6">
              <h2 className="font-display text-lg font-bold text-content">
                Badges Earned
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-surface-muted/60 p-2.5 border border-border/50">
                  <span className="text-2xl" title="First Game Built">🎮</span>
                  <p className="mt-1 text-[10px] font-bold text-content leading-tight">First Game</p>
                </div>
                <div className="rounded-xl bg-surface-muted/60 p-2.5 border border-border/50">
                  <span className="text-2xl" title="Code Ninja">🥷</span>
                  <p className="mt-1 text-[10px] font-bold text-content leading-tight">Code Ninja</p>
                </div>
                <div className="rounded-xl bg-surface-muted/60 p-2.5 border border-border/50">
                  <span className="text-2xl" title="Loop Master">🔄</span>
                  <p className="mt-1 text-[10px] font-bold text-content leading-tight">Loop Master</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-card p-6">
              <h2 className="font-display text-lg font-bold text-content">
                Student Resources
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-brand-pink hover:underline text-xs flex items-center gap-1">
                    📄 Course Syllabus & Roadmap
                  </Link>
                </li>
                <li>
                  <a href="https://scratch.mit.edu" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline text-xs flex items-center gap-1">
                    🐱 Official Scratch Editor (external)
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-brand-pink hover:underline text-xs flex items-center gap-1">
                    💬 Contact Support / Ask Tutor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player for Class Recordings */}
      {activeRecording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-surface shadow-glow overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface-muted px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  Class {activeRecording.classNumber} Revision Recording
                </span>
                <h3 className="font-display font-bold text-content text-lg">
                  {activeRecording.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveRecording(null)}
                className="rounded-lg p-1.5 text-content-muted hover:bg-surface hover:text-content"
                aria-label="Close video player"
              >
                ✕
              </button>
            </div>

            {/* Video Body */}
            <div className="relative aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`${activeRecording.videoUrl}?autoplay=1`}
                title={activeRecording.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="bg-surface px-6 py-4 text-xs text-content-muted flex items-center justify-between">
              <span>Duration: {activeRecording.duration}</span>
              <span>Need help? Contact your tutor or join the next live class.</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
