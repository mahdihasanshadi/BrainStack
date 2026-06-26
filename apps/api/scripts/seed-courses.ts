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
  | "longDescription"
  | "durationMonths"
  | "displayOrder"
  | "priceBdt"
  | "originalPriceBdt"
  | "isPurchasable"
  | "stripePriceId"
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
    slug: "logical-reasoning-scratch",
    title: "Junior Game Dev: Scratch & Logic",
    ageMin: 8,
    ageMax: 14,
    shortDescription:
      "Build 4 real Bangladeshi games in 4 months using Scratch — Rickshaw Race, Fuchka Clicker, Cricket Match, and your own original game. Zero coding experience needed.",
    longDescription:
      "Bangladesh's #1 coding course for kids aged 8–14. We take proven programming concepts and make them deeply Bangladeshi — your child learns X/Y coordinates through Rickshaw grids, if/else logic through Biryani decisions, and randomization through cricket bowlers. 20 live+recorded classes, monthly parent Showcase Days, gems/badges/streaks gamification, and a Grand Finale where kids demo their original game live. The logic transfers to any future programming language.",
    durationMonths: 4,
    displayOrder: 1,
    priceBdt: 4999,
    originalPriceBdt: 12999,
    isPurchasable: true,
    stripePriceId: null,
    levels: [
      {
        levelNumber: 1,
        title: "Control & Movement — The Street Rules",
        toolName: "Scratch",
        description:
          "Learn sequencing, X/Y coordinates, loops, collision detection, and basic physics using Dhaka traffic logic. Build a playable Rickshaw street-racing game.",
        finalOutcome:
          "A complete 2D Dhaka Street game with arrow-key controls, collision detection, and a loop-back mechanic — shareable via WhatsApp link.",
        durationMonths: 1,
        learningOutcomes: [
          "Understand X and Y coordinate grid mapping",
          "Use Forever and Repeat(N) loops effectively",
          "Detect sprite collisions with sensor blocks",
          "Simulate gravity using Y-coordinate changes",
          "Present work at Showcase Day 1",
        ],
      },
      {
        levelNumber: 2,
        title: "Decision Making & States — The Biryani Hunt",
        toolName: "Scratch",
        description:
          "Master If/Else conditionals, Variables, and Timers by building the Fuchka Clicker and Load Shedding survival games — then combining them into one mega-game.",
        finalOutcome:
          "A multi-mechanic survival game: Fuchka clicker with a scoring variable, a chutney unlock condition, and a countdown Load Shedding challenge all in one.",
        durationMonths: 1,
        learningOutcomes: [
          "Use Ask/Wait blocks and check string equality",
          "Create and update variables with 'Change by'",
          "Apply comparison operators (>, <, =)",
          "Build countdown timers with decrements",
          "Combine two game mechanics into one project",
        ],
      },
      {
        levelNumber: 3,
        title: "Game Mechanics & Math — The Cricket Match",
        toolName: "Scratch",
        description:
          "Learn randomization, nested conditionals, sprite cloning, and inter-sprite messaging by building a full 2D Cricket Championship game with scoreboard.",
        finalOutcome:
          "A playable 2D cricket game with a randomized bowler, batting mechanic, auto-generated crowd, scene transitions, and a functional scoreboard tracking runs.",
        durationMonths: 1,
        learningOutcomes: [
          "Use 'pick random' for unpredictable game behavior",
          "Write nested If/Else blocks for complex decisions",
          "Clone sprites to generate crowds efficiently",
          "Use Broadcast messages for scene management",
          "Track multiple game stats simultaneously",
        ],
      },
      {
        levelNumber: 4,
        title: "The Independent Studio — Meta-Learning",
        toolName: "Scratch",
        description:
          "Learn professional clean code habits (Custom Blocks), UI/UX design, debugging techniques, and apply everything to build an original Bangladeshi game from scratch at the Grand Finale Hackathon.",
        finalOutcome:
          "An original, fully playable Bangladeshi game designed, coded, debugged, and presented live by the student at the Grand Finale Showcase.",
        durationMonths: 1,
        learningOutcomes: [
          "Create reusable 'My Blocks' (custom functions)",
          "Design professional game menus and start screens",
          "Debug code systematically like a real developer",
          "Plan and execute an original project idea",
          "Present and explain your game to a live audience",
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
