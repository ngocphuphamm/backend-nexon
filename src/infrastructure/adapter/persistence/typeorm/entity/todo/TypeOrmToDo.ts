import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';

@Entity('todos')
export class TypeOrmToDo {
  @PrimaryColumn({ length: 36 })
  public id: string;

  @Column({ length: 255 })
  public title: string;

  @Column('text')
  public description: string;

  @Column({ type: 'datetime' })
  public startTime: Date;

  @Column({ type: 'datetime' })
  public endTime: Date;

  @Column({ type: 'enum', enum: ToDoStatus })
  public status: ToDoStatus;

  @Column({ type: 'enum', enum: ToDoPriority })
  public priority: ToDoPriority;

  @Column({ length: 36 })
  public userId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public user: { id: string; email: string };
}
