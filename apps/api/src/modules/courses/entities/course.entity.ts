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

  @Column({ type: "integer", default: 0 })
  priceBdt!: number;

  @Column({ type: "integer", default: 12999 })
  originalPriceBdt!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  stripePriceId!: string | null;

  @Column({ type: "boolean", default: false })
  isPurchasable!: boolean;

  @Column({ type: "text", nullable: true })
  longDescription!: string | null;

  @OneToMany(() => CourseLevel, (level) => level.course)
  levels!: CourseLevel[];
}
