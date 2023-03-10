import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE Api_Keys (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        key_value VARCHAR(255) NOT NULL,
        version VARCHAR(50) NOT NULL,
        permissions ENUM('GENERAL', 'VIP') NOT NULL,
        comments TEXT,
        status ENUM('ACTIVE', 'INACTIVE') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public."Api_Keys";');
    await queryRunner.query('DROP TYPE USER_ROLE_ENUM;');
  }
}
