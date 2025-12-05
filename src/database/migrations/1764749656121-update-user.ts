import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1764749656121 implements MigrationInterface {
    name = 'UpdateUser1764749656121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
