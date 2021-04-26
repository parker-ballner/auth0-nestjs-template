import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1619402925202 implements MigrationInterface {
  name = 'init1619402925202'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub" text NOT NULL, "username" text NOT NULL, "first" text NOT NULL, "last" text NOT NULL, "email" text NOT NULL, CONSTRAINT "UQ_2ca016813ffcce3392b3eb8ed0c" UNIQUE ("sub"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
