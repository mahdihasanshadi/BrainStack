import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";
import { CourseLevel } from "../src/modules/courses/entities/course-level.entity";
import { Course } from "../src/modules/courses/entities/course.entity";

config({ path: join(__dirname, "../.env") });

type SeedCourse = Pick<
  Course,
  | "slug"
  | "title"
  | "ageMin"
  | "ageMax"
  | "shortDescription"
  | "durationMonths"
  | "displayOrder"
> & {
  levels: Array<
    Pick<
      CourseLevel,
      | "levelNumber"
      | "title"
      | "toolName"
      | "description"
      | "finalOutcome"
      | "durationMonths"
      | "learningOutcomes"
    >
  >;
};

const INITIAL_COURSES: SeedCourse[] = [
  {
    slug: "track-1",
    title: "Track 1",
    ageMin: 6,
    ageMax: 8,
    shortDescription: "Placeholder program for ages 6 to 8.",
    durationMonths: 12,
    displayOrder: 1,
    levels: [
      {
        levelNumber: 1,
        title: "Level 1",
        toolName: "Learning platform",
        description: "Placeholder description for the first level.",
        finalOutcome: "Placeholder outcome for level 1.",
        durationMonths: 6,
        learningOutcomes: [
          "Placeholder learning outcome A",
          "Placeholder learning outcome B",
        ],
      },
      {
        levelNumber: 2,
        title: "Level 2",
        toolName: "Learning platform",
        description: "Placeholder description for the second level.",
        finalOutcome: "Placeholder outcome for level 2.",
        durationMonths: 6,
        learningOutcomes: ["Placeholder learning outcome C"],
      },
    ],
  },
  {
    slug: "track-2",
    title: "Track 2",
    ageMin: 9,
    ageMax: 11,
    shortDescription: "Placeholder program for ages 9 to 11.",
    durationMonths: 12,
    displayOrder: 2,
    levels: [
      {
        levelNumber: 1,
        title: "Level 1",
        toolName: "Learning platform",
        description: "Placeholder description for the first level.",
        finalOutcome: "Placeholder outcome for level 1.",
        durationMonths: 6,
        learningOutcomes: [
          "Placeholder learning outcome A",
          "Placeholder learning outcome B",
        ],
      },
    ],
  },
  {
    slug: "track-3",
    title: "Track 3",
    ageMin: 12,
    ageMax: 14,
    shortDescription: "Placeholder program for ages 12 to 14.",
    durationMonths: 12,
    displayOrder: 3,
    levels: [
      {
        levelNumber: 1,
        title: "Level 1",
        toolName: "Learning platform",
        description: "Placeholder description for the first level.",
        finalOutcome: "Placeholder outcome for level 1.",
        durationMonths: 6,
        learningOutcomes: ["Placeholder learning outcome A"],
      },
      {
        levelNumber: 2,
        title: "Level 2",
        toolName: "Learning platform",
        description: "Placeholder description for the second level.",
        finalOutcome: "Placeholder outcome for level 2.",
        durationMonths: 6,
        learningOutcomes: [
          "Placeholder learning outcome B",
          "Placeholder learning outcome C",
        ],
      },
    ],
  },
];

async function seedCourses(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Course, CourseLevel],
    synchronize: false,
  });

  await dataSource.initialize();

  try {
    const coursesRepository = dataSource.getRepository(Course);
    const existingCount = await coursesRepository.count();

    if (existingCount > 0) {
      console.log(
        `Skipping course seed — ${existingCount} course(s) already exist.`,
      );
      return;
    }

    for (const seedCourse of INITIAL_COURSES) {
      const { levels, ...courseData } = seedCourse;
      const course = coursesRepository.create(courseData);
      await coursesRepository.save(course);

      const levelsRepository = dataSource.getRepository(CourseLevel);
      await levelsRepository.save(
        levels.map((level) =>
          levelsRepository.create({ ...level, courseId: course.id }),
        ),
      );
    }

    console.log(`Seeded ${INITIAL_COURSES.length} courses.`);
  } finally {
    await dataSource.destroy();
  }
}

seedCourses().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
