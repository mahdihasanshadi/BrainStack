"use client";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TOOLS = [
  {
    name: "Scratch",
    emoji: "🐱",
    description: "Visual block coding — perfect for young creators to build games and animations.",
    color: "from-orange-400/20 to-orange-600/10",
  },
  {
    name: "Zoom",
    emoji: "📹",
    description: "Secure live video classes with screen sharing so instructors guide in real time.",
    color: "from-blue-400/20 to-blue-600/10",
  },
  {
    name: "Google Classroom",
    emoji: "📓",
    description: "Homework, resources, and progress tracking in one familiar place.",
    color: "from-green-400/20 to-brand-green/10",
  },
  {
    name: "Blockly",
    emoji: "🧱",
    description: "Drag-and-drop logic blocks that teach sequencing, loops, and conditions.",
    color: "from-purple-400/20 to-purple-600/10",
  },
  {
    name: "Canva",
    emoji: "🎨",
    description: "Design sprites, backgrounds, and story assets for Scratch projects.",
    color: "from-pink-400/20 to-pink-600/10",
  },
  {
    name: "Tinkercad",
    emoji: "🔧",
    description: "Introductory 3D design for older tracks exploring creative engineering.",
    color: "from-cyan-400/20 to-cyan-600/10",
  },
] as const;

export function ToolsSection() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="tools-heading">
      <div className="site-container">
        <SectionHeader
          id="tools-heading"
          eyebrow="Tools & platforms"
          title={
            <>
              Best-in-class tools for the{" "}
              <span className="gradient-text">best learning experience</span>
            </>
          }
          description="Industry-standard platforms your child will use from day one — the same stack trusted by top coding academies worldwide."
          align="center"
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {TOOLS.map((tool) => (
            <StaggerItem key={tool.name}>
              <div
                className={`group flex h-full items-start gap-4 rounded-2xl border border-border bg-gradient-to-br ${tool.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-glass text-2xl shadow-glass backdrop-blur-xl transition-transform group-hover:scale-110">
                  {tool.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-content">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-muted">
                    {tool.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
