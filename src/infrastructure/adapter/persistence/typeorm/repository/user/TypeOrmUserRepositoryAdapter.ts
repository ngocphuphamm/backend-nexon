import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { TypeOrmUserMapper } from '@infrastructure/adapter/persistence/typeorm/entity/user/mapper/TypeOrmUserMapper';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser';
import { EntityRepository, InsertResult, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends BaseRepository<TypeOrmUser>
  implements UserRepositoryPort
{
  private readonly userAlias: string = 'user';

  public async findUser(
    by: { id?: string; email?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Optional<User>> {
    let domainEntity: Optional<User>;

    const query: SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEntity: Optional<TypeOrmUser | null> = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmUserMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  public async countUsers(
    by: { id?: string; name?: string },
    options: RepositoryFindOptions = {}
  ): Promise<number> {
    const query: SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    return query.getCount();
  }

  public async addUser(user: User): Promise<{ id: string }> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);

    const insertResult: InsertResult = await this.createQueryBuilder(
      this.userAlias
    )
      .insert()
      .into(TypeOrmUser)
      .values([ormUser])
      .execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  private buildUserQueryBuilder(): SelectQueryBuilder<TypeOrmUser> {
    return this.createQueryBuilder(this.userAlias).select();
  }

  private extendQueryWithByProperties(
    by: { id?: string; email?: string },
    query: SelectQueryBuilder<TypeOrmUser>
  ): void {
    switch (true) {
    case Boolean(by.id):
      query.andWhere(`${this.userAlias}.id = :id`, { id: by.id });
      break;
    case Boolean(by.email):
      query.andWhere(`${this.userAlias}.email = :email`, {
        email: by.email,
      });
      break;
    default:
      // Handle the case where neither ID nor email is provided.
      throw new Error(
        'Please provide either an ID or an email to search for a user.'
      );
    }
  }
}
