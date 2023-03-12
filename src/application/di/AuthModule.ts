import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module, Provider } from '@nestjs/common';

import { LocalStrategy } from '@application/api/auth/passport/LocalStrategy';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { AuthController } from '@application/api/controller/AuthController';
import { AuthService } from '@application/api/auth/AuthService';
import { JwtStrategy } from '@application/api/auth/passport/JwtStrategy';
import { UserModule } from '@application/di/UserModule';
import { UserDITokens } from '@core/domain/user/di/UserDIToken';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';


const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository: any) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

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
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ...useCaseProviders,
  ],
})
export class AuthModule {}
