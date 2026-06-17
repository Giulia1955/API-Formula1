import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCars1776446466125 implements MigrationInterface {
    name = 'CreateCars1776446466125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driver" character varying NOT NULL, "team" character varying NOT NULL, "carNumber" integer NOT NULL, "manufacturer" character varying NOT NULL, "championshipPosition" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
