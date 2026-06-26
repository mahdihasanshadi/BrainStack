import { getCourses, type CourseSummary } from "@/lib/api";
import { CoursesGrid } from "./CoursesStates";

/** Static fallback — shown when the API is unreachable */
const STATIC_COURSES: CourseSummary[] = [
  {
    id: "1",
    slug: "logical-reasoning-scratch",
    title: "Junior Game Dev: Scratch & Logic",
    ageMin: 8,
    ageMax: 14,
    shortDescription:
      "Build 4 real Bangladeshi games in 4 months — Rickshaw Race, Fuchka Clicker, Cricket Match, and your own original game. Zero coding experience needed.",
    longDescription:
      "Bangladesh's #1 coding course for kids. 20 live+recorded classes, monthly Showcase Days, and a gamification system that keeps kids coming back.",
    durationMonths: 4,
    displayOrder: 1,
    priceBdt: 4999,
    originalPriceBdt: 12999,
    isPurchasable: true,
  },
];

export async function CoursesSectionContent() {
  try {
    const courses = await getCourses();
    const list = courses.length > 0 ? courses : STATIC_COURSES;
    return <CoursesGrid courses={list} />;
  } catch {
    return <CoursesGrid courses={STATIC_COURSES} />;
  }
}
