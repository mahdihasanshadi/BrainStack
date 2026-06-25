import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "class_slots" })
export class ClassSlot {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "integer" })
  minAge!: number;

  @Column({ type: "integer" })
  maxAge!: number;

  /** 0 = Sunday through 6 = Saturday (JavaScript Date.getDay convention). */
  @Column({ type: "integer" })
  dayOfWeek!: number;

  @Column({ type: "varchar", length: 5 })
  startTime!: string;

  @Column({ type: "varchar", length: 5 })
  endTime!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;
}
