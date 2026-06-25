import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course.entity";

@Entity({ name: "course_levels" })
export class CourseLevel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  courseId!: string;

  @ManyToOne(() => Course, (course) => course.levels, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "courseId" })
  course!: Course;

  @Column({ type: "integer" })
  levelNumber!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 255 })
  toolName!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 500 })
  finalOutcome!: string;

  @Column({ type: "integer" })
  durationMonths!: number;

  @Column({ type: "jsonb" })
  learningOutcomes!: string[];
}
