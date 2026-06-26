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
          eyebrow="Our Flagship Program"
          title={
            <>
              One course.{" "}
              <span className="gradient-text">Perfectly crafted.</span>
            </>
          }
          description="Junior Game Dev: Scratch & Logic — 4 months, 20 classes, 4 real Bangladeshi games. Ages 8–14. No coding experience needed."
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
