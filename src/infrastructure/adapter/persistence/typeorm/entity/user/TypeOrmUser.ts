import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class TypeOrmUser {
  
  @PrimaryColumn()
  public id: string;
  
  @Column()
  public username: string;
  
  @Column()
  public email: string;
  
  @Column()
  public password: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
