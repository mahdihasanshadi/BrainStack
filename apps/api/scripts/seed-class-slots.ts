import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";
import { ClassSlot } from "../src/modules/class-slots/entities/class-slot.entity";

config({ path: join(__dirname, "../.env") });

const INITIAL_CLASS_SLOTS: Array<
  Pick<ClassSlot, "minAge" | "maxAge" | "dayOfWeek" | "startTime" | "endTime">
> = [
  { minAge: 6, maxAge: 8, dayOfWeek: 2, startTime: "16:00", endTime: "17:00" },
  { minAge: 6, maxAge: 8, dayOfWeek: 6, startTime: "10:00", endTime: "11:00" },
  { minAge: 9, maxAge: 11, dayOfWeek: 3, startTime: "16:00", endTime: "17:00" },
  {
    minAge: 9,
    maxAge: 11,
    dayOfWeek: 6,
    startTime: "11:30",
    endTime: "12:30",
  },
  {
    minAge: 12,
    maxAge: 14,
    dayOfWeek: 4,
    startTime: "17:00",
    endTime: "18:00",
  },
  {
    minAge: 12,
    maxAge: 14,
    dayOfWeek: 6,
    startTime: "14:00",
    endTime: "15:00",
  },
];

async function seedClassSlots(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [ClassSlot],
    synchronize: false,
  });

  await dataSource.initialize();

  try {
    const repository = dataSource.getRepository(ClassSlot);
    const existingCount = await repository.count();

    if (existingCount > 0) {
      console.log(
        `Skipping class slot seed — ${existingCount} slot(s) already exist.`,
      );
      return;
    }

    await repository.save(
      INITIAL_CLASS_SLOTS.map((slot) =>
        repository.create({ ...slot, isActive: true }),
      ),
    );

    console.log(`Seeded ${INITIAL_CLASS_SLOTS.length} class slots.`);
  } finally {
    await dataSource.destroy();
  }
}

seedClassSlots().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
