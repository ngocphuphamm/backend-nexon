import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { AuthController } from '@application/api/controller/AuthController';
import { AuthService } from '@application/api/auth/AuthService';
import { JwtStrategy } from '@application/api/auth/passport/JwtStrategy';
import { UserModule } from '@application/di/UserModule';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { LocalStrategy } from '@application/api/auth/passport/LocalStrategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ApiServerConfig.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES}m`,
      },
    }),
    UserModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
