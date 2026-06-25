import { config } from "dotenv";
import { join } from "path";
import * as bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { User, UserRole } from "../src/modules/users/entities/user.entity";

config({ path: join(__dirname, "../.env") });

const BCRYPT_SALT_ROUNDS = 12;

async function seedAdmin(): Promise<void> {
  const email = process.argv[2]?.trim().toLowerCase();
  const password = process.argv[3];
  const fullName = process.argv[4]?.trim() ?? "BrainStack Admin";
  const phone = process.argv[5]?.trim() ?? "0000000000";

  if (!email || !password) {
    console.error(
      "Usage: npm run seed:admin -- <email> <password> [fullName] [phone]",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: false,
  });

  await dataSource.initialize();

  try {
    const usersRepository = dataSource.getRepository(User);
    const existing = await usersRepository.findOne({ where: { email } });

    if (existing) {
      console.error(`A user with email "${email}" already exists.`);
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const admin = usersRepository.create({
      fullName,
      email,
      passwordHash,
      phone,
      role: UserRole.ADMIN,
      isVerified: true,
      onboardingCompleted: true,
      assessmentResult: null,
    });

    await usersRepository.save(admin);

    console.log(`Admin user created: ${email}`);
  } finally {
    await dataSource.destroy();
  }
}

seedAdmin().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
