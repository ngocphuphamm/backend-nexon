import { Entity } from '@core/common/entity/Entity';
import { IsEmail, IsString } from 'class-validator';

export class ToDoUser extends Entity<string> {
  @IsString()
  @IsEmail()
  private readonly email: string;

  constructor(id: string, email: string) {
    super();

    this.id = id;
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }


  public static async new(
    id: string,
    email: string,
  ): Promise<ToDoUser> {
    const toDoUser: ToDoUser = new ToDoUser(id, email);
    await toDoUser.validate();

    return toDoUser;
  }
}
