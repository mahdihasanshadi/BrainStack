import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRegistrationLeadTrialFields1781786000000
  implements MigrationInterface
{
  name = "AddRegistrationLeadTrialFields1781786000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."registration_leads_mediumofinstruction_enum" AS ENUM('bangla_medium', 'english_medium', 'english_version', 'madrasah')`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "mediumOfInstruction" "public"."registration_leads_mediumofinstruction_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."registration_leads_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "gender" "public"."registration_leads_gender_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."registration_leads_preferredlanguage_enum" AS ENUM('english', 'bangla')`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "preferredLanguage" "public"."registration_leads_preferredlanguage_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "hasDevice" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ALTER COLUMN "consentGivenAt" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ALTER COLUMN "consentGivenAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "hasDevice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "preferredLanguage"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."registration_leads_preferredlanguage_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "gender"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."registration_leads_gender_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "mediumOfInstruction"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."registration_leads_mediumofinstruction_enum"`,
    );
  }
}
