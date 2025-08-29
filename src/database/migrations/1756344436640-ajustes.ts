import { MigrationInterface, QueryRunner } from "typeorm";

export class Ajustes1756344436640 implements MigrationInterface {
    name = 'Ajustes1756344436640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_rol_enum" RENAME TO "user_rol_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_rol_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" TYPE "public"."user_rol_enum" USING "rol"::"text"::"public"."user_rol_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" SET DEFAULT 'USER'`);
        await queryRunner.query(`DROP TYPE "public"."user_rol_enum_old"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying DEFAULT 'ACCESORIOS'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying(1) DEFAULT 'ACCESORIOS'`);
        await queryRunner.query(`CREATE TYPE "public"."user_rol_enum_old" AS ENUM('A', 'U')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" TYPE "public"."user_rol_enum_old" USING "rol"::"text"::"public"."user_rol_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "rol" SET DEFAULT 'U'`);
        await queryRunner.query(`DROP TYPE "public"."user_rol_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_rol_enum_old" RENAME TO "user_rol_enum"`);
    }

}
