import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUrlIndexes1724284877000 implements MigrationInterface {
  name = 'AddUrlIndexes1724284877000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create index on slug for fast lookups (if not already exists due to unique constraint)
    // Note: The unique constraint on slug already creates an index, but we'll ensure it exists
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_url_slug" ON "urls" ("slug")
    `)

    // Create index on clickCount alone for general popularity queries
    await queryRunner.query(`
      CREATE INDEX "IDX_url_clickCount" ON "urls" ("clickCount" DESC)
    `)

    // Create composite index for slug and clickCount for sorting by popularity
    await queryRunner.query(`
      CREATE INDEX "IDX_url_slug_clickCount" ON "urls" ("slug", "clickCount" DESC)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the indexes in reverse order
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_url_clickCount"`)
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_url_slug_clickCount"`)
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_url_slug"`)
  }
}
