import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRegistrationLeadsParentalConsent1781785000000
  implements MigrationInterface
{
  name = "AddRegistrationLeadsParentalConsent1781785000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "parentalConsent" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD "consentGivenAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ALTER COLUMN "parentalConsent" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "consentGivenAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP COLUMN "parentalConsent"`,
    );
  }
}
