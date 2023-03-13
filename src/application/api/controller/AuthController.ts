import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Body,
  Res,
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
import { ResponseLogout } from './documentation/auth/Logout';
import { JwtAuthGuard } from '@application/api/auth/guard/JwtAuthGuard';
import { Response, response } from 'express';
import { Code } from '../../../core/common/code/Code';
import { Exception } from '../../../core/common/exception/Exception';
import { ResponseException } from '../../../core/common/exception/ResponseException';
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
    @Req() req: RequestWithUser,
    @Res() response: Response
  ): Promise<Response<CoreApiResponse<LoggedInUser>>> {
    try {
      const data: LoggedInUser = await this.authService.login(req.user);
      return response
        .status(Code.SUCCESS.code)
        .json(CoreApiResponse.success(data));
    } catch (err) {
      console.log(err);
      return ResponseException(err, response);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RegisterBody })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseUser })
  public async createAccount(
    @Body() body: RegisterBody,
    @Res() response: Response
  ): Promise<Response<CoreApiResponse<UserUseCaseDto>>> {
    try {
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

      return response
        .status(Code.SUCCESS.code)
        .json(CoreApiResponse.success(createdUser));
    } catch (err) {
      return ResponseException(err, response);
    }
  }

  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RefreshTokenBody })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToken })
  public async refreshToken(
    @Body() body: RefreshTokenBody,
    @Res() response: Response
  ): Promise<Response<CoreApiResponse<string>>> {
    try {
      const data: string = await this.authService.refreshToken(
        body.refreshToken
      );
      return response
        .status(Code.SUCCESS.code)
        .json(CoreApiResponse.success(data));
    } catch (error) {
      return ResponseException(error, response);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseLogout })
  public async logout(
    @Body() body: RefreshTokenBody,
    @Res() response: Response
  ): Promise<Response<CoreApiResponse<ResponseLogout>>> {
    try {
      await this.authService.logout(body.refreshToken);
      return response.status(Code.SUCCESS.code).json(
        CoreApiResponse.success({
          description: 'Logout successfully',
        })
      );
    } catch (err) {
      console.log(err);
      return ResponseException(err, response);
    }
  }
}
