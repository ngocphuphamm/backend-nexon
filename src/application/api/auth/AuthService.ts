import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  JwtPayload,
  LoggedInUser,
  UserPayload,
} from '@application/api/auth/type/AuthTypes';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { UserDITokens } from '@core/domain/user/di/UserDIToken';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,

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

  public login(user: UserPayload): LoggedInUser {
    const payload: JwtPayload = { id: user.id };
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async getUser(by: { id: string }): Promise<Optional<User>> {
    return this.userRepository.findUser(by);
  }
}
