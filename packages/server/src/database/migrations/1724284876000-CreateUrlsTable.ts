import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUrlsTable1724284876000 implements MigrationInterface {
  name = 'CreateUrlsTable1724284876000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "urls" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "slug" character varying NOT NULL,
        "originalUrl" text NOT NULL,
        "clickCount" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_urls_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_urls_id" PRIMARY KEY ("id")
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "urls"`)
  }
}
