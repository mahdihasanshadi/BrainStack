import { getCourses } from "@/lib/api";
import {
  CoursesEmptyState,
  CoursesErrorState,
  CoursesGrid,
} from "./CoursesStates";

export async function CoursesSectionContent() {
  try {
    const courses = await getCourses();

    if (courses.length === 0) {
      return <CoursesEmptyState />;
    }

    return <CoursesGrid courses={courses} />;
  } catch {
    return <CoursesErrorState />;
  }
}
