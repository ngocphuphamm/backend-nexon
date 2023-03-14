import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import {
  JwtPayload,
  LoggedInUser,
  UserPayload,
} from '@application/api/auth/type/AuthTypes';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { UserDITokens } from '@core/domain/user/di/UserDIToken';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { Exception } from '@core/common/exception/Exception';
import { Code } from '@core/common/code/Code';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    @InjectRedis()
    private readonly redis: Redis,

    private readonly jwtService: JwtService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<Nullable<UserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({
      email: email,
    });

    if (!user) return null;

    const isPasswordValid: boolean = await user.comparePassword(password);

    if (!isPasswordValid) return null;

    return {
      id: user.getId(),
      email: user.getEmail(),
    };
  }

  public async login(userLogin: UserPayload): Promise<LoggedInUser> {
    const user: Optional<User> = await this.getUser({ id: userLogin.id });
    if (!user)
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Invalid user',
      });
      
    const [accessToken, refreshToken] = await this.generateToken(user);

    return {
      id: userLogin.id,
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(refreshToken: string): Promise<string> {
    const verifiedJWt = await this.jwtService.verify(refreshToken);
    await CoreAssert.isTrue(
      verifiedJWt,
      Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Invalid refresh token',
      })
    );

    await this.isTokenBlacklisted(refreshToken);

    const userId = await this.redis.get(refreshToken);
    await CoreAssert.notEmpty(
      userId,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'refresh token doesn" t exist in Redis',
      })
    );

    const user: Optional<User> = await this.getUser({ id: userId });
    await CoreAssert.notEmpty(
      user,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'user not exist',
      })
    );

    const accessToken = await this.jwtService.sign({
      id: user?.getId(),
      email: user?.getEmail(),
      username: user?.getUserName(),
    });
    return accessToken;
  }

  public async logout(refreshToken: string): Promise<void> {
    const blacklisted = await this.isTokenBlacklisted(refreshToken);
    if (!blacklisted) {
      await this.redis.set(refreshToken, 'blacklisted');
      await this.redis.expire(
        refreshToken,
        60 * 60 * 24 * 7 * 1000 + 60 * 15 * 1000 // TTL of 7 days and 15 minutes
      );
    }
  }

  public async getUser(by: { id: string }): Promise<Optional<User>> {
    return this.userRepository.findUser(by);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.getId(),
      email: user.getEmail(),
      username: user.getUserName(),
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    // Store the refresh token in Redis
    await this.redis.set(
      refreshToken,
      user.getId(),
      'PX',
      60 * 60 * 24 * 7 * 1000 + 60 * 15 * 1000 // TTL of 7 days and 15 minutes
    );
    return [accessToken, refreshToken];
  }

  private async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenBlacklisted: string = await this.redis.get(token);
    if (tokenBlacklisted === 'blacklisted') {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Token in blacklist ',
      });
    }
    return false;
  }
}
