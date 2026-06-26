import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "parent_meeting_leads" })
export class ParentMeetingLead {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  parentName!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50 })
  phone!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  childName!: string | null;

  @Column({ type: "integer" })
  childAge!: number;

  @Column({ type: "text", nullable: true })
  questions!: string | null;

  @Column({ type: "timestamptz" })
  consentGivenAt!: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
