import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdmissionProcessSection } from "@/components/programs/AdmissionProcessSection";
import { CourseDetailHero } from "@/components/programs/CourseDetailHero";
import { CourseLevelsSection } from "@/components/programs/CourseLevelsSection";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";
import { ApiError, getCourseBySlug } from "@/lib/api";

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

async function loadCourse(slug: string) {
  try {
    return await getCourseBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  try {
    const course = await getCourseBySlug(params.slug);
    return {
      title: `${course.title} | BrainStack`,
      description: course.shortDescription,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Track not found | BrainStack" };
    }

    return { title: "BrainStack" };
  }
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const course = await loadCourse(params.slug);

  return (
    <main>
      <CourseDetailHero course={course} />
      <CourseLevelsSection levels={course.levels} />
      <AdmissionProcessSection />
      <FinalCtaBanner />
    </main>
  );
}
