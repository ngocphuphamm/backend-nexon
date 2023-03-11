import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('apiKeys')
export class TypeOrmApiKey {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ length: 255 })
    keyValue: string;

  @Column({ length: 50 })
    version: string;

  @Column({ type: 'enum', enum: ['GENERAL', 'VIP'] })
    permissions: string;

  @Column('text', { nullable: true })
    comments: string;

  @Column({ type: 'enum', enum: ['ACTIVE', 'INACTIVE'] })
    status: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
