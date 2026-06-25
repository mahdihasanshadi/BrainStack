import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";
import { ClassSlot } from "../modules/class-slots/entities/class-slot.entity";
import { CourseLevel } from "../modules/courses/entities/course-level.entity";
import { Course } from "../modules/courses/entities/course.entity";
import { RegistrationLead } from "../modules/registration-leads/entities/registration-lead.entity";
import { User } from "../modules/users/entities/user.entity";

config({ path: join(__dirname, "../../.env") });

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, RegistrationLead, ClassSlot, Course, CourseLevel],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  migrationsTableName: "migrations",
  synchronize: false,
});
