import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('todos')
export class TypeOrmToDo {
  @PrimaryColumn({ length: 36 })
    id: string;

  @Column({ length: 255 })
    title: string;

  @Column('text')
    description: string;

  @Column({ type: 'datetime', nullable: true })
    startTime: Date;

  @Column({ type: 'datetime', nullable: true })
    endTime: Date;

  @Column({ type: 'enum', enum: ['to do', 'in progress', 'done'] })
    status: string;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'] })
    priority: string;

  @Column({ length: 36 })
    userId: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
