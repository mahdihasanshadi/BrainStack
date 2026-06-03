import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  PARENT = "parent",
  STUDENT = "student",
  ADMIN = "admin",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  fullName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ type: "varchar", length: 50 })
  phone!: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role!: UserRole;

  @Column({ type: "boolean", default: false })
  isVerified!: boolean;

  @Column({ type: "boolean", default: false })
  onboardingCompleted!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  assessmentResult!: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
