import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassSlot } from "../../class-slots/entities/class-slot.entity";

export enum MediumOfInstruction {
  BANGLA_MEDIUM = "bangla_medium",
  ENGLISH_MEDIUM = "english_medium",
  ENGLISH_VERSION = "english_version",
  MADRASAH = "madrasah",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum PreferredLanguage {
  ENGLISH = "english",
  BANGLA = "bangla",
}

@Entity({ name: "registration_leads" })
export class RegistrationLead {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  parentName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50 })
  phone!: string;

  @Column({ type: "varchar", length: 255 })
  childName!: string;

  @Column({ type: "integer" })
  childAge!: number;

  @Column({
    type: "enum",
    enum: MediumOfInstruction,
  })
  mediumOfInstruction!: MediumOfInstruction;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender!: Gender;

  @Column({
    type: "enum",
    enum: PreferredLanguage,
  })
  preferredLanguage!: PreferredLanguage;

  @Column({ type: "boolean" })
  hasDevice!: boolean;

  @Column({ type: "uuid" })
  classSlotId!: string;

  @ManyToOne(() => ClassSlot, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "classSlotId" })
  classSlot!: ClassSlot;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @Column({ type: "boolean" })
  parentalConsent!: boolean;

  @Column({ type: "timestamptz" })
  consentGivenAt!: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
