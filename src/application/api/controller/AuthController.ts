import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '@application/api/auth/AuthService';
import { LocalAuthGuard } from '@application/api/auth/guard/LocalAuthGuard';
import { LoginBody } from '@application/api/controller/documentation/auth/LoginBody';
import { RequestWithUser } from '@application/api/auth/type/AuthTypes';
import { CoreApiResponse } from '../../../core/common/api/CoreApiResponse';
import { LoggedInUser } from '../auth/type/AuthTypes';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginBody })
  @ApiResponse({ status: HttpStatus.OK, type: LoginBody })
  public async login(
    @Req() req: RequestWithUser,
  ): Promise<CoreApiResponse<LoggedInUser>> {
    return CoreApiResponse.success(this.authService.login(req.user));
  }
}
