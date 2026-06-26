import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOriginalPriceAndCoursePurchases1781790000000
  implements MigrationInterface
{
  name = "AddOriginalPriceAndCoursePurchases1781790000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "courses"
      ADD COLUMN IF NOT EXISTS "originalPriceBdt" integer NOT NULL DEFAULT 12999
    `);

    await queryRunner.query(`
      UPDATE "courses"
      SET "priceBdt" = 4999,
          "originalPriceBdt" = 12999
      WHERE "slug" = 'logical-reasoning-scratch'
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "course_purchases" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "courseId" uuid NOT NULL,
        "email" character varying(255) NOT NULL,
        "phone" character varying(50),
        "parentName" character varying(255),
        "stripeSessionId" character varying(255) NOT NULL,
        "amountBdt" integer NOT NULL,
        "originalPriceBdt" integer NOT NULL,
        "status" character varying(32) NOT NULL DEFAULT 'pending',
        "provider" character varying(32) NOT NULL DEFAULT 'stripe',
        "paymentMethod" character varying(255),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "completedAt" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_course_purchases" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_course_purchases_stripeSessionId" UNIQUE ("stripeSessionId"),
        CONSTRAINT "FK_course_purchases_course" FOREIGN KEY ("courseId")
          REFERENCES "courses"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "course_purchases"`);
    await queryRunner.query(`
      ALTER TABLE "courses" DROP COLUMN IF EXISTS "originalPriceBdt"
    `);
  }
}
