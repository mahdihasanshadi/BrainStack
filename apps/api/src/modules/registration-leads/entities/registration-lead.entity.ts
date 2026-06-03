import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "registration_leads" })
export class RegistrationLead {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  parentName!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 50 })
  phone!: string;

  @Column({ type: "varchar", length: 255 })
  childName!: string;

  @Column({ type: "integer" })
  childAge!: number;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
