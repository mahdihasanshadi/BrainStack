import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClassSlotsAndLeadSlotFk1781787000000 implements MigrationInterface {
    name = 'AddClassSlotsAndLeadSlotFk1781787000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class_slots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minAge" integer NOT NULL, "maxAge" integer NOT NULL, "dayOfWeek" integer NOT NULL, "startTime" character varying(5) NOT NULL, "endTime" character varying(5) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_6b9498c25110fcb7c1f8a472b6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registration_leads" ADD "classSlotId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "registration_leads" ADD CONSTRAINT "FK_32ee12f921e5c4b64c94af9c47d" FOREIGN KEY ("classSlotId") REFERENCES "class_slots"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_leads" DROP CONSTRAINT "FK_32ee12f921e5c4b64c94af9c47d"`);
        await queryRunner.query(`ALTER TABLE "registration_leads" DROP COLUMN "classSlotId"`);
        await queryRunner.query(`DROP TABLE "class_slots"`);
    }

}
