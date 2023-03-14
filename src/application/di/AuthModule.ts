import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

import { LocalStrategy } from '@application/api/auth/passport/LocalStrategy';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { AuthController } from '@application/api/controller/AuthController';
import { AuthService } from '@application/api/auth/AuthService';
import { JwtStrategy } from '@application/api/auth/passport/JwtStrategy';
import { UserDITokens } from '@core/domain/user/di/UserDIToken';
import { CreateUserService } from '@core/service/user/usecase/CreateUserService';
import { ApiKeyDITokens } from '@core/domain/apiKey/di/ApiKeyDITokens';
import { TypeOrmApiKeyRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/apiKey/TypeOrmApiKeyRepositoryAdapter';
import { ApiKeyStrategy } from '@application/api/auth/passport/ApiKeyStrategy';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/user/TypeOrmUserRepositoryAdapter';
import { NestWrapperGetUserPreviewQueryHandler } from '@infrastructure/handler/user/NestWrapperGetUserPreviewQueryHandler';
import { HandleGetUserPreviewQueryService } from '@core/service/user/handler/HandleGetUserPreviewQueryService';

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository: any) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];
const persistenceProviders: Provider[] = [
  {
    provide: ApiKeyDITokens.ApiKeyRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmApiKeyRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
];
const handlerProviders: Provider[] = [
  NestWrapperGetUserPreviewQueryHandler,
  {
    provide: UserDITokens.GetUserPreviewQueryHandler,
    useFactory: (userRepository) =>
      new HandleGetUserPreviewQueryService(userRepository),
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
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ApiKeyStrategy,
    ...useCaseProviders,
    ...persistenceProviders,
    ...handlerProviders
  ],
})
export class AuthModule {}
