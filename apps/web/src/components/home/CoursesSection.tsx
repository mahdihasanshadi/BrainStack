import { Suspense } from "react";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COURSES_SECTION_ID } from "@/components/layout/nav-links";
import { CoursesSectionContent } from "./CoursesSectionContent";
import { CoursesLoadingState } from "./CoursesStates";

export function CoursesSection() {
  return (
    <section
      id={COURSES_SECTION_ID}
      className="relative scroll-mt-28 py-24 sm:py-32"
      aria-labelledby="courses-heading"
    >
      <AnimatedBackground variant="minimal" />

      <div className="site-container relative">
        <SectionHeader
          id="courses-heading"
          eyebrow="Choose your program"
          title={
            <>
              Exciting tracks,{" "}
              <span className="gradient-text">curated by experts</span>
            </>
          }
          description="Select the age-appropriate path for your child — each program is a stepped journey through Scratch and foundational coding with live guidance every week."
          align="center"
        />

        <div className="mt-16">
          <Suspense fallback={<CoursesLoadingState />}>
            <CoursesSectionContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
