import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRegistrationLeadsEmailUnique1781784000000
  implements MigrationInterface
{
  name = "AddRegistrationLeadsEmailUnique1781784000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registration_leads" ADD CONSTRAINT "UQ_registration_leads_email" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "registration_leads" DROP CONSTRAINT "UQ_registration_leads_email"`,
    );
  }
}
