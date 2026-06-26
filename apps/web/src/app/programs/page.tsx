import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CoursesSectionContent } from "@/components/home/CoursesSectionContent";
import { CoursesLoadingState } from "@/components/home/CoursesStates";

export const metadata: Metadata = {
  title: "Programs & Courses | BrainStack",
  description:
    "Explore BrainStack coding programs for kids — logical reasoning, Scratch, live classes, and project-based learning.",
};

export default function ProgramsPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AnimatedBackground variant="hero" />

        <div className="site-container relative">
          <SectionHeader
            eyebrow="Our programs"
            title={
              <>
                Courses built for{" "}
                <span className="gradient-text">curious young minds</span>
              </>
            }
            description="Live weekly sessions, pre-recorded lessons, Scratch projects, and gamified progress — designed for both kids and parents."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="site-container">
          <Suspense fallback={<CoursesLoadingState />}>
            <CoursesSectionContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
