"use client";

import { useState } from "react";
import { ScratchEditorFrame } from "@/components/learn/ScratchEditorFrame";
import {
  SCRATCH_PRACTICE_LESSONS,
  type ScratchPracticeLesson,
} from "@/lib/scratch-practice";

interface ScratchPracticePanelProps {
  initialClassNumber?: number;
  compact?: boolean;
}

export function ScratchPracticePanel({
  initialClassNumber = 1,
  compact = false,
}: ScratchPracticePanelProps) {
  const [activeLesson, setActiveLesson] = useState<ScratchPracticeLesson>(
    () =>
      SCRATCH_PRACTICE_LESSONS.find((l) => l.classNumber === initialClassNumber) ??
      SCRATCH_PRACTICE_LESSONS[1],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Block practice lab
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-content">
            Class {activeLesson.classNumber}: {activeLesson.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-content-muted">
            {activeLesson.description}
          </p>
        </div>

        <label className="flex shrink-0 flex-col gap-1.5">
          <span className="text-xs font-semibold text-content-muted">Choose class</span>
          <select
            className="form-select mt-0 min-w-[16rem] py-2.5 text-sm"
            value={activeLesson.classNumber}
            onChange={(event) => {
              const next = SCRATCH_PRACTICE_LESSONS.find(
                (lesson) => lesson.classNumber === Number(event.target.value),
              );
              if (next) setActiveLesson(next);
            }}
          >
            {SCRATCH_PRACTICE_LESSONS.map((lesson) => (
              <option key={lesson.classNumber} value={lesson.classNumber}>
                Class {lesson.classNumber} — {lesson.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`grid gap-5 ${compact ? "" : "xl:grid-cols-[240px_minmax(0,1fr)]"}`}>
        <aside className="glass-card p-5">
          <h3 className="font-display text-sm font-bold text-content">Today&apos;s goals</h3>
          <ul className="mt-3 space-y-2.5">
            {activeLesson.goals.map((goal) => (
              <li key={goal} className="flex gap-2 text-sm text-content-muted">
                <span className="font-bold text-brand-yellow">✓</span>
                {goal}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-content-faint">
            Tip: After each class recording, rebuild the project here block-by-block. Your work
            saves locally in the editor until you export it.
          </p>
        </aside>

        <ScratchEditorFrame lesson={activeLesson} compact={compact} />
      </div>
    </div>
  );
}
