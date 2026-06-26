import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentMeetingLeadsAndCoursePricing1781789000000
  implements MigrationInterface
{
  name = "AddParentMeetingLeadsAndCoursePricing1781789000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "parent_meeting_leads" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "parentName" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "phone" character varying(50) NOT NULL,
        "childName" character varying(255),
        "childAge" integer NOT NULL,
        "questions" text,
        "consentGivenAt" TIMESTAMPTZ NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_parent_meeting_leads_email" UNIQUE ("email"),
        CONSTRAINT "PK_parent_meeting_leads" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "kid_assessments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "parentEmail" character varying(255),
        "childAge" integer NOT NULL,
        "answers" jsonb NOT NULL,
        "score" integer NOT NULL,
        "readinessLevel" character varying(50) NOT NULL,
        "recommendation" text NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_kid_assessments" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "courses"
      ADD COLUMN "priceBdt" integer NOT NULL DEFAULT 0,
      ADD COLUMN "stripePriceId" character varying(255),
      ADD COLUMN "isPurchasable" boolean NOT NULL DEFAULT false,
      ADD COLUMN "longDescription" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "courses"
      DROP COLUMN "longDescription",
      DROP COLUMN "isPurchasable",
      DROP COLUMN "stripePriceId",
      DROP COLUMN "priceBdt"
    `);
    await queryRunner.query(`DROP TABLE "kid_assessments"`);
    await queryRunner.query(`DROP TABLE "parent_meeting_leads"`);
  }
}
