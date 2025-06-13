import { MigrationInterface, QueryRunner } from 'typeorm';

export class StreamerData1741830539356 implements MigrationInterface {
  name = 'StreamerData1741830539356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "streamer_data" ("discord" character varying, "tiktok" character varying, "twitter" character varying, "instagram" character varying, "streamerlogo" character varying, "roobetCode" character varying, "streamerName" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07c0c0945e69643ae21e7720352" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "streamer_data"`);
  }
}
