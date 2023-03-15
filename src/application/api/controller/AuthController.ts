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
import { RefreshTokenBody } from '@application/api/controller/documentation/auth/RefreshToken';
import { ResponseToken } from '@application/api/controller/documentation/auth/ResponseToken';
import { ResponseLogout } from '@application/api/controller/documentation/auth/Logout';
import { JwtAuthGuard } from '@application/api/auth/guard/JwtAuthGuard';
import { ApiKeyAuthGuard } from '@application/api/auth/guard/ApiKeyAuthGuard';
import { ResponseRegisterBody } from '@application/api/controller/documentation/auth/ReponseRegisterBody';

@UseGuards(ApiKeyAuthGuard)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginBody })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToken })
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
  ): Promise<CoreApiResponse<ResponseRegisterBody>> {
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

    const userResponse = (({ id, username, email }: UserUseCaseDto) => ({
      id,
      username,
      email,
    }))(createdUser);

    return CoreApiResponse.success(userResponse);
  }

  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RefreshTokenBody })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToken })
  public async refreshToken(
    @Body() body: RefreshTokenBody
  ): Promise<CoreApiResponse<string>> {
    const data: string = await this.authService.refreshToken(body.refreshToken);
    return CoreApiResponse.success(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseLogout })
  public async logout(
    @Body() body: RefreshTokenBody
  ): Promise<CoreApiResponse<ResponseLogout>> {
    await this.authService.logout(body.refreshToken);
    return CoreApiResponse.success({
      description: 'Logout successfully',
    });
  }
}
