import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserRepositoryPort } from '../../../domain/user/port/persistence/UserRepositoryPort';
import { CreateUserPort } from '../../../domain/user/port/usecase/CreateUserPort';
import { UserUseCaseDto } from '../../../domain/user/usecase/dto/UserUseCaseDto';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { Exception } from '@core/common/exception/Exception';
import { Code } from '@core/common/code/Code';
import { User } from '@core/domain/user/entity/User';
export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const doesUserExist: boolean = !!(await this.userRepository.countUsers({
      email: payload.email,
    }));
    CoreAssert.isFalse(
      doesUserExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'User already exists',
      })
    );

    const user: User = await User.new(
      (({ email, password, username }: CreateUserPort) => ({
        email,
        password,
        username,
      }))(payload)
    );

    await this.userRepository.addUser(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
