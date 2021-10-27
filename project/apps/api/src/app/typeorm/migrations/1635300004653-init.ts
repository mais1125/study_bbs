import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../../interface/category.interface';
import { CategoryEntity } from '../entities';

export class init1635300004653 implements MigrationInterface {
  name = 'init1635300004653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Threads\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '親スレッドID', \`title\` varchar(255) NOT NULL COMMENT 'タイトル', \`cidId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`Categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('カテゴリA', 'カテゴリB', 'カテゴリC') NOT NULL COMMENT 'カテゴリー', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`Messages\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'レスID', \`text\` varchar(255) NOT NULL COMMENT '本文', \`name\` varchar(255) NOT NULL COMMENT '名前', \`editkey\` varchar(255) NOT NULL COMMENT '編集キー', \`tidId\` int NULL COMMENT '親スレッドID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`Threads\` ADD CONSTRAINT \`FK_02676988b65a40ffc1fc9e24f5c\` FOREIGN KEY (\`cidId\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`Messages\` ADD CONSTRAINT \`FK_1bf26505b6c6e6236016d1ed74c\` FOREIGN KEY (\`tidId\`) REFERENCES \`Threads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

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
