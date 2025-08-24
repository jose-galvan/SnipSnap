import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCreatedByToUrl1756056265207 implements MigrationInterface {
  name = 'AddCreatedByToUrl1756056265207'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "urls" ADD "createdById" uuid`)
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "FK_747bd110325be5ee7509ff2472e" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_747bd110325be5ee7509ff2472e"`)
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "createdById"`)
  }
}
