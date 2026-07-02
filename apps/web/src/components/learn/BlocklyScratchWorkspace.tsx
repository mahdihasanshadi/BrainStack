"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScratchPracticeLesson } from "@/lib/scratch-practice";
import { getBlocklyToolbox, registerScratchBlocks } from "@/lib/scratch-blockly";
import { getTurboWarpEditorUrl } from "@/lib/scratch-practice";

interface SpriteState {
  x: number;
  y: number;
  direction: number;
  say: string | null;
  think: string | null;
  vars: Record<string, number>;
}

interface BlocklyScratchWorkspaceProps {
  lesson: ScratchPracticeLesson;
  compact?: boolean;
}

const STAGE_W = 480;
const STAGE_H = 360;

function createInitialSprite(): SpriteState {
  return { x: 0, y: 0, direction: 90, say: null, think: null, vars: { Score: 0 } };
}

export function BlocklyScratchWorkspace({ lesson, compact = false }: BlocklyScratchWorkspaceProps) {
  const blocklyHostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workspaceRef = useRef<import("blockly").WorkspaceSvg | null>(null);
  const spriteRef = useRef<SpriteState>(createInitialSprite());
  const keysRef = useRef<Record<string, boolean>>({});

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string>("Drag blocks, then click the green flag.");
  const [spriteView, setSpriteView] = useState<SpriteState>(createInitialSprite());

  const drawStage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = spriteRef.current;
    const scale = canvas.width / STAGE_W;
    const cx = canvas.width / 2 + sprite.x * scale;
    const cy = canvas.height / 2 - sprite.y * scale;

    ctx.fillStyle = "#e8f4ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(56,147,244,0.15)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= STAGE_W; gx += 40) {
      const x = (gx - STAGE_W / 2) * scale + canvas.width / 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let gy = 0; gy <= STAGE_H; gy += 40) {
      const y = (STAGE_H / 2 - gy) * scale + canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(((90 - sprite.direction) * Math.PI) / 180);
    ctx.font = `${32 * scale}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🐱", 0, 0);
    ctx.restore();

    if (sprite.say) {
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#14233C";
      ctx.lineWidth = 2;
      const padding = 8;
      ctx.font = "14px system-ui";
      const tw = ctx.measureText(sprite.say).width;
      const bx = cx - tw / 2 - padding;
      const by = cy - 56;
      ctx.beginPath();
      ctx.roundRect(bx, by, tw + padding * 2, 28, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#14233C";
      ctx.fillText(sprite.say, cx, by + 14);
    }

    if (Object.keys(sprite.vars).length > 0) {
      ctx.fillStyle = "#FF8C1A";
      ctx.strokeStyle = "#14233C";
      ctx.lineWidth = 1.5;
      const label = `Score: ${sprite.vars.Score ?? 0}`;
      ctx.font = "bold 13px system-ui";
      const tw = ctx.measureText(label).width;
      ctx.beginPath();
      ctx.roundRect(12, 12, tw + 16, 26, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#14233C";
      ctx.fillText(label, 20, 27);
    }
  }, []);

  useEffect(() => {
    drawStage();
  }, [drawStage, spriteView]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code === "Space" ? "space" : e.key] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code === "Space" ? "space" : e.key] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let workspace: import("blockly").WorkspaceSvg | null = null;

    async function init() {
      const Blockly = await import("blockly");
      const { javascriptGenerator } = await import("blockly/javascript");
      await import("blockly/blocks");

      if (disposed || !blocklyHostRef.current) return;

      registerScratchBlocks(Blockly, javascriptGenerator);

      workspace = Blockly.inject(blocklyHostRef.current, {
        toolbox: getBlocklyToolbox(lesson) as unknown as NonNullable<
          Parameters<typeof Blockly.inject>[1]
        >["toolbox"],
        grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
        zoom: { controls: true, wheel: true, startScale: compact ? 0.85 : 1 },
        trashcan: true,
        theme: Blockly.Themes.Zelos,
      });

      workspaceRef.current = workspace;

      if (!workspace.getBlocksByType("event_when_flag", false).length) {
        const flagBlock = workspace.newBlock("event_when_flag");
        flagBlock.initSvg();
        flagBlock.render();
        flagBlock.moveBy(40, 40);
      }
    }

    void init();

    return () => {
      disposed = true;
      workspace?.dispose();
      workspaceRef.current = null;
    };
  }, [lesson, compact]);

  const resetSprite = () => {
    spriteRef.current = createInitialSprite();
    setSpriteView({ ...spriteRef.current });
    drawStage();
  };

  const runCode = async () => {
    const workspace = workspaceRef.current;
    if (!workspace || running) return;

    const { javascriptGenerator } = await import("blockly/javascript");

    const topBlocks = workspace.getTopBlocks(true);
    const flagBlock = topBlocks.find((b) => b.type === "event_when_flag");

    if (!flagBlock) {
      setStatus("Add a “when 🚩 clicked” block to start.");
      return;
    }

    setRunning(true);
    setStatus("Running…");
    resetSprite();

    const api = {
      __vars: spriteRef.current.vars,
      __runStack: async (fn: () => Promise<void>) => fn(),
      __move: async (steps: number) => {
        const rad = ((90 - spriteRef.current.direction) * Math.PI) / 180;
        spriteRef.current.x += Math.cos(rad) * steps;
        spriteRef.current.y += Math.sin(rad) * steps;
        spriteRef.current.say = null;
        setSpriteView({ ...spriteRef.current });
        drawStage();
        await new Promise((r) => setTimeout(r, 120));
      },
      __turn: async (degrees: number) => {
        spriteRef.current.direction = (spriteRef.current.direction + degrees) % 360;
        setSpriteView({ ...spriteRef.current });
        drawStage();
        await new Promise((r) => setTimeout(r, 80));
      },
      __goto: async (x: number, y: number) => {
        spriteRef.current.x = x;
        spriteRef.current.y = y;
        setSpriteView({ ...spriteRef.current });
        drawStage();
        await new Promise((r) => setTimeout(r, 100));
      },
      __say: async (message: string) => {
        spriteRef.current.say = message;
        spriteRef.current.think = null;
        setSpriteView({ ...spriteRef.current });
        drawStage();
        await new Promise((r) => setTimeout(r, 800));
      },
      __think: async (message: string) => {
        spriteRef.current.think = message;
        spriteRef.current.say = message;
        setSpriteView({ ...spriteRef.current });
        drawStage();
        await new Promise((r) => setTimeout(r, 800));
      },
      __wait: async (secs: number) => {
        await new Promise((r) => setTimeout(r, secs * 1000));
      },
      __updateVars: async () => {
        setSpriteView({ ...spriteRef.current });
        drawStage();
      },
      __keyDown: (key: string) => {
        if (key === "space") return !!keysRef.current.space;
        return !!keysRef.current[key];
      },
    };

    try {
      const code = javascriptGenerator.blockToCode(flagBlock);
      const runner = new Function(
        "__runStack",
        "__move",
        "__turn",
        "__goto",
        "__say",
        "__think",
        "__wait",
        "__updateVars",
        "__keyDown",
        "__vars",
        `return (async () => { ${code} })();`,
      );

      await runner(
        api.__runStack,
        api.__move,
        api.__turn,
        api.__goto,
        api.__say,
        api.__think,
        api.__wait,
        api.__updateVars,
        api.__keyDown,
        api.__vars,
      );

      setStatus("Done! Edit blocks and run again, or open full Scratch to save your project.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong running your blocks.");
    } finally {
      setRunning(false);
    }
  };

  const editorUrl = getTurboWarpEditorUrl(lesson.starterProjectId);
  const blocklyHeight = compact ? "h-[320px]" : "h-[420px]";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0f1117] shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#1a1d29] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-2 font-mono text-xs text-white/60">
            Class {lesson.classNumber} · scratch.brainstack.studio
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void runCode()}
            disabled={running}
            className="rounded-lg bg-[#4CBF56] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#5fd968] disabled:opacity-60"
          >
            🚩 Run
          </button>
          <button
            type="button"
            onClick={resetSprite}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
          >
            Reset stage
          </button>
          <a
            href={editorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-brand-green/40 bg-brand-green/10 px-3 py-1.5 text-xs font-semibold text-brand-green-light"
          >
            Full Scratch editor ↗
          </a>
        </div>
      </div>

      <div className={`grid ${compact ? "" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}>
        <div
          ref={blocklyHostRef}
          className={`${blocklyHeight} w-full min-w-0`}
          aria-label="Scratch blocks workspace"
        />

        <div className="border-t border-white/10 bg-[#12151c] p-3 lg:border-l lg:border-t-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Stage</p>
          <canvas
            ref={canvasRef}
            width={STAGE_W}
            height={STAGE_H}
            className="w-full rounded-xl border border-white/10 bg-[#e8f4ff]"
            aria-label="Sprite stage preview"
          />
          <p className="mt-3 text-xs leading-relaxed text-white/60">{status}</p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1a1d29] px-4 py-3 text-xs text-white/60">
        Drag Scratch-style blocks · Click 🚩 Run to test on the stage · Use “Full Scratch editor” to save
        projects and build full games
      </div>
    </div>
  );
}
