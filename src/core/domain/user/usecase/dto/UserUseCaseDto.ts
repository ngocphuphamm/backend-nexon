import { User } from '@core/domain/user/entity/User';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public password: string;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToClass(UserUseCaseDto, user);
  }
}
