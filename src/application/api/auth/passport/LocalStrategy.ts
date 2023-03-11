import { AuthService } from '@application/api/auth/AuthService';
import { UserPayload } from '@application/api/auth/type/AuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: AuthService) {
    super({
      usernameField: ApiServerConfig.LOGIN_USERNAME_FIELD,
      passwordField: ApiServerConfig.LOGIN_PASSWORD_FIELD,
    });
  }
  
  public async validate(username: string, password: string): Promise<UserPayload> {
    const user: UserPayload = CoreAssert.notEmpty(
      await this.authService.validateUser(username, password),
      Exception.new({code: Code.WRONG_CREDENTIALS_ERROR})
    );
    return user;
  }

}
