import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '@common/models';
import { CategoryEntity } from '../entities';

export class init1635404189281 implements MigrationInterface {
  name = 'init1635404189281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const category: Category[] = [
      {
        name: 'カテゴリA',
      },
      {
        name: 'カテゴリB',
      },
      {
        name: 'カテゴリC',
      },
    ];
    await queryRunner.manager.save(CategoryEntity, category);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Messages\` DROP FOREIGN KEY \`FK_1bf26505b6c6e6236016d1ed74c\``
    );
    await queryRunner.query(
      `ALTER TABLE \`Threads\` DROP FOREIGN KEY \`FK_02676988b65a40ffc1fc9e24f5c\``
    );
    await queryRunner.query(`DROP TABLE \`Messages\``);
    await queryRunner.query(`DROP TABLE \`Categories\``);
    await queryRunner.query(`DROP TABLE \`Threads\``);
  }
}
