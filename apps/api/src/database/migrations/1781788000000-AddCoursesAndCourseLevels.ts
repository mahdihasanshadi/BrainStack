import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoursesAndCourseLevels1781788000000 implements MigrationInterface {
    name = 'AddCoursesAndCourseLevels1781788000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "ageMin" integer NOT NULL, "ageMax" integer NOT NULL, "shortDescription" text NOT NULL, "durationMonths" integer NOT NULL, "displayOrder" integer NOT NULL, CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a" UNIQUE ("slug"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseId" uuid NOT NULL, "levelNumber" integer NOT NULL, "title" character varying(255) NOT NULL, "toolName" character varying(255) NOT NULL, "description" text NOT NULL, "finalOutcome" character varying(500) NOT NULL, "durationMonths" integer NOT NULL, "learningOutcomes" jsonb NOT NULL, CONSTRAINT "PK_509f92357e4c6e163709c68c54d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_levels" ADD CONSTRAINT "FK_7b8d553292b702a1136cae2d5d5" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_levels" DROP CONSTRAINT "FK_7b8d553292b702a1136cae2d5d5"`);
        await queryRunner.query(`DROP TABLE "course_levels"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
