import { UserDITokens } from '@core/domain/user/di/UserDIToken';
import { GetUserUseCase } from '@core/domain/user/usecase/GetUserUseCase';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';

import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    
    @Inject(UserDITokens.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,
  ) {}
  


}
