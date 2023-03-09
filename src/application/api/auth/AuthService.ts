import { Injectable } from '@nestjs/common';
import { UserDITokens } from '../../../core/domain/user/di/UserDIToken';
import {
  JwtPayload,
  LoggedInUser,
  UserPayload,
} from '@application/api/auth/type/AuthTypes';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { Nullable, Optional } from '../../../core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
@Injectable()
export class AuthService {
  constructor(
    @Injectable(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Nullable<UserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({
      email: username,
    });

    if (!user) return null;

    const isPasswordValid: boolean = await user.comparePassword(password);

    if (!isPasswordValid) return null;

    return {
      id: user.getId(),
      username: user.getUserName(),
      email: user.getEmail(),
    };
  }

  public async login({ id }: UserPayload): LoggedInUser {
    const payload: JwtPayload = { id };
    return {
      id,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
