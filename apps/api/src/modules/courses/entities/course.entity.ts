import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseLevel } from "./course-level.entity";

@Entity({ name: "courses" })
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  slug!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "integer" })
  ageMin!: number;

  @Column({ type: "integer" })
  ageMax!: number;

  @Column({ type: "text" })
  shortDescription!: string;

  @Column({ type: "integer" })
  durationMonths!: number;

  @Column({ type: "integer" })
  displayOrder!: number;

  @OneToMany(() => CourseLevel, (level) => level.course)
  levels!: CourseLevel[];
}
