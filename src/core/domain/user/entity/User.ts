import { Entity } from '@core/common/entity/Entity';
import { Nullable } from '@core/common/type/CommonTypes';
import { CreateUserEntityPayload } from '@core/domain/user/entity/type/CreateUserEntityPayload';
import { compare, genSalt, hash } from 'bcryptjs';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';

export class User extends Entity<string> {
  @IsString()
  private readonly username: string;

  @IsEmail()
  private readonly email: string;

  @IsString()
  private password: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private updatedAt: Nullable<Date>;

  constructor(payload: CreateUserEntityPayload) {
    super();

    this.id = payload.id || v4();
    this.username = payload.username;
    this.email = payload.email;
    this.password = payload.password;

    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || null;
  }

  public getUserName(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Nullable<Date> {
    return this.updatedAt;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
