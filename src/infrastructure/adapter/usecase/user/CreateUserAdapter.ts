import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, MinLength, Matches, IsString} from 'class-validator';

import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';

@Exclude()
export class CreateUserAdapter
  extends UseCaseValidatableAdapter
  implements CreateUserPort
{
  @Expose()
  @IsString()
  public username: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsString()
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
