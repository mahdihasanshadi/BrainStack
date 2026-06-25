import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1781782342064 implements MigrationInterface {
    name = 'InitialSchema1781782342064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration_leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parentName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(50) NOT NULL, "childName" character varying(255) NOT NULL, "childAge" integer NOT NULL, "notes" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5d028be2da92cc5603e80f6e6e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('parent', 'student', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "passwordHash" character varying(255) NOT NULL, "phone" character varying(50) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "onboardingCompleted" boolean NOT NULL DEFAULT false, "assessmentResult" character varying(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "registration_leads"`);
    }

}
