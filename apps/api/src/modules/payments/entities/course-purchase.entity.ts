import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "../../courses/entities/course.entity";

export type PurchaseStatus = "pending" | "completed" | "failed" | "cancelled";
export type PaymentProvider = "stripe" | "demo";

@Entity({ name: "course_purchases" })
export class CoursePurchase {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  courseId!: string;

  @ManyToOne(() => Course, { onDelete: "CASCADE" })
  @JoinColumn({ name: "courseId" })
  course!: Course;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  parentName!: string | null;

  @Column({ type: "varchar", length: 255, unique: true })
  stripeSessionId!: string;

  @Column({ type: "integer" })
  amountBdt!: number;

  @Column({ type: "integer" })
  originalPriceBdt!: number;

  @Column({ type: "varchar", length: 32, default: "pending" })
  status!: PurchaseStatus;

  @Column({ type: "varchar", length: 32, default: "stripe" })
  provider!: PaymentProvider;

  @Column({ type: "varchar", length: 255, nullable: true })
  paymentMethod!: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  completedAt!: Date | null;
}
