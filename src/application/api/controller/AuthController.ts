import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Body,
  Inject,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthService } from '@application/api/auth/AuthService';
import { LocalAuthGuard } from '@application/api/auth/guard/LocalAuthGuard';
import { LoginBody } from '@application/api/controller/documentation/auth/LoginBody';
import { RequestWithUser } from '@application/api/auth/type/AuthTypes';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { LoggedInUser } from '@application/api/auth/type/AuthTypes';
import { RegisterBody } from '@application/api/controller/documentation/auth/RegisterBody';
import { ResponseUser } from '@application/api/controller/documentation/user/ResponseUser';
import { UserUseCaseDto } from '@core/domain/user/usecase/dto/UserUseCaseDto';
import { CreateUserAdapter } from '@infrastructure/adapter/usecase/user/CreateUserAdapter';
import { CreateUserUseCase } from '@core/domain/user/usecase/CreateUserUseCase';
import { UserDITokens } from '@core/domain/user/di/UserDIToken';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginBody })
  @ApiResponse({ status: HttpStatus.OK, type: LoginBody })
  public async login(
    @Req() req: RequestWithUser
  ): Promise<CoreApiResponse<LoggedInUser>> {
    const data: LoggedInUser = await this.authService.login(req.user);
    return CoreApiResponse.success(data);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RegisterBody })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseUser })
  public async createAccount(
    @Body() body: RegisterBody
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new(
      (({ username, email, password }: RegisterBody) => ({
        username,
        email,
        password,
      }))(body)
    );
    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(
      adapter
    );

    return CoreApiResponse.success(createdUser);
  }
}
