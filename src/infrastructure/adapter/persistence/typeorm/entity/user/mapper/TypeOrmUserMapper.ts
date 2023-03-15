import { User } from '@core/domain/user/entity/User';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser';

export class TypeOrmUserMapper {
  public static toOrmEntity(domainUser: User): TypeOrmUser {
    const ormUser: TypeOrmUser = new TypeOrmUser();

    ormUser.id = domainUser.getId();
    ormUser.username = domainUser.getUserName();
    ormUser.email = domainUser.getEmail();
    ormUser.password = domainUser.getPassword();

    ormUser.createdAt = domainUser.getCreatedAt();
    ormUser.updatedAt = domainUser.getUpdatedAt() as Date;

    return ormUser;
  }

  public static toOrmEntities(domainUsers: User[]): TypeOrmUser[] {
    return domainUsers.map((domainUser) => this.toOrmEntity(domainUser));
  }

  public static toDomainEntity(ormUser: TypeOrmUser): User {
    const domainUser: User = new User({
      username: ormUser.username,
      email: ormUser.email,
      password: ormUser.password,
      id: ormUser.id,
      createdAt: ormUser.createdAt,
      updatedAt: ormUser.updatedAt || null,
    });
    return domainUser;
  }

  public static toDomainEntities(ormUsers: TypeOrmUser[]): User[] {
    return ormUsers.map((ormUser) => this.toDomainEntity(ormUser));
  }
}
