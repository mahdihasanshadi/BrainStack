"use client";

import dynamic from "next/dynamic";
import type { ScratchPracticeLesson } from "@/lib/scratch-practice";
import {
  getTurboWarpEditorUrl,
  getTurboWarpPlayerEmbedUrl,
} from "@/lib/scratch-practice";

const BlocklyScratchWorkspace = dynamic(
  () =>
    import("@/components/learn/BlocklyScratchWorkspace").then((m) => m.BlocklyScratchWorkspace),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-border bg-[#1a1d29] text-white/70">
        Loading block editor…
      </div>
    ),
  },
);

interface ScratchEditorFrameProps {
  lesson: ScratchPracticeLesson;
  compact?: boolean;
}

export function ScratchEditorFrame({ lesson, compact = false }: ScratchEditorFrameProps) {
  const playerUrl = lesson.starterProjectId
    ? getTurboWarpPlayerEmbedUrl(lesson.starterProjectId)
    : null;
  const fullEditorUrl = getTurboWarpEditorUrl(lesson.starterProjectId);

  return (
    <div className="space-y-4">
      <BlocklyScratchWorkspace lesson={lesson} compact={compact} />

      {playerUrl ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-[#0f1117]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#1a1d29] px-4 py-2.5">
            <p className="text-xs font-semibold text-white/70">
              Example project preview (TurboWarp player)
            </p>
            <a
              href={fullEditorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-brand-green-light hover:underline"
            >
              Edit this template in Scratch ↗
            </a>
          </div>
          <div className="flex justify-center bg-[#0f1117] p-4">
            <iframe
              src={playerUrl}
              title={`Class ${lesson.classNumber} example project`}
              width={482}
              height={412}
              allowTransparency
              frameBorder={0}
              scrolling="no"
              allowFullScreen
              style={{ colorScheme: "auto" }}
              className="max-w-full rounded-lg"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
