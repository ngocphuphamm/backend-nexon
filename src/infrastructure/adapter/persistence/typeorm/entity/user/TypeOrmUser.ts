import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity('users')
export class TypeOrmUser {
  @PrimaryColumn({ length: 36 })
    id: string;

  @Column({ length: 155 })
    username: string;

  @Column({ length: 155 })
    email: string;

  @Column({ length: 255 })
    password: string;

  @Column()
    createdAt: Date;

  @Column()
    updatedAt: Date;
}
