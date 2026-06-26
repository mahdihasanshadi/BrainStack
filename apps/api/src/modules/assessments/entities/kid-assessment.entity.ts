import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "kid_assessments" })
export class KidAssessment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  parentEmail!: string | null;

  @Column({ type: "integer" })
  childAge!: number;

  @Column({ type: "jsonb" })
  answers!: Record<string, string>;

  @Column({ type: "integer" })
  score!: number;

  @Column({ type: "varchar", length: 50 })
  readinessLevel!: string;

  @Column({ type: "text" })
  recommendation!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
