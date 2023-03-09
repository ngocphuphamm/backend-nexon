import { AuthService } from '@application/api/auth/AuthService';
import { JwtPayload, UserPayload } from '@application/api/auth/type/AuthTypes';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { User } from '@core/domain/user/entity/User';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(
        ApiServerConfig.ACCESS_TOKEN_HEADER,
      ),
      ignoreExpiration: false,
      secretOrKey: ApiServerConfig.ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPayload> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser({ id: payload.id }),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR }),
    );

    return {
      id: user.getId(),
      email: user.getEmail(),
      username: user.getUserName(),
    };
  }
}
