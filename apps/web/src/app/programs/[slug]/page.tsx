import type { Metadata } from "next";
import { CourseDetailHero } from "@/components/programs/CourseDetailHero";
import { ScratchMediaSection } from "@/components/programs/ScratchMediaSection";
import { ScratchCurriculumSection } from "@/components/programs/ScratchCurriculumSection";
import { ScratchWhatYouBuild } from "@/components/programs/ScratchWhatYouBuild";
import { ScratchGamification } from "@/components/programs/ScratchGamification";
import { ApiError, getCourseBySlug, type CourseDetail } from "@/lib/api";

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

/** Static fallback — used when the API is unreachable */
const STATIC_COURSE: CourseDetail = {
  id: "1",
  slug: "logical-reasoning-scratch",
  title: "Junior Game Dev: Scratch & Logic",
  shortDescription:
    "Build real Bangladeshi games and master logical thinking with Scratch programming. No coding experience needed.",
  longDescription:
    "4 months. 20 classes. 4 complete games. Your child goes from zero to building their own original Bangladeshi game — while learning the logical thinking skills that transfer to any career.",
  ageMin: 8,
  ageMax: 14,
  durationMonths: 4,
  displayOrder: 1,
  priceBdt: 4999,
  originalPriceBdt: 12999,
  isPurchasable: true,
  levels: [],
};

async function loadCourse(slug: string): Promise<CourseDetail> {
  try {
    return await getCourseBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      // Genuinely not found — use static fallback rather than 404
      return STATIC_COURSE;
    }
    // API down / connection refused — use static fallback
    return STATIC_COURSE;
  }
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  return {
    title: "Junior Game Dev: Scratch & Logic | BrainStack",
    description:
      "Bangladesh's #1 coding course for kids aged 8–14. Build 4 real BD-themed games in 4 months using Scratch. Live classes, gamification, and zero coding experience needed.",
    openGraph: {
      title: "Junior Game Dev: Scratch & Logic | BrainStack",
      description:
        "Build real Bangladeshi games — Rickshaw Race, Fuchka Clicker, Cricket Championship — while mastering the logical thinking skills that shape tomorrow's problem-solvers.",
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const course = await loadCourse(params.slug);

  return (
    <main className="pb-24 lg:pb-0">
      {/* 1. Udemy-style hero with sticky purchase card */}
      <CourseDetailHero course={course} />

      <ScratchMediaSection />

      <ScratchWhatYouBuild />

      {/* 3. Full curriculum accordion — 4 months, 20 classes */}
      <ScratchCurriculumSection />

      {/* 4. Gamification, parent reviews, FAQ, bottom CTA */}
      <ScratchGamification />
    </main>
  );
}
