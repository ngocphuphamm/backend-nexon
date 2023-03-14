import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {  EntityRepository, SelectQueryBuilder } from 'typeorm';

import { TypeOrmApiKey } from '@infrastructure/adapter/persistence/typeorm/entity/apikey/TypeOrmApiKey';
import { ApiKeyRepositoryPort } from '@core/domain/apiKey/port/persistence/ApiKeyRepositoryPort';
import { ApiKey } from '@core/domain/apiKey/entity/ApiKey';
import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { TypeOrmApiKeyMapper } from '../../entity/apikey/mapper/TypeOrmApiKeyMapper';

@EntityRepository(TypeOrmApiKey)
export class TypeOrmApiKeyRepositoryAdapter
  extends BaseRepository<TypeOrmApiKey>
  implements ApiKeyRepositoryPort
{
  private readonly apiKeyAlias: string = 'apiKeys';

  public async findApiKey(
    by: { keyValue?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Optional<ApiKey>> {
    let domainEntity: Optional<ApiKey>;
    const query: SelectQueryBuilder<TypeOrmApiKey> = this.buildApiKeyQueryBuilder();
    this.extendQueryWithByProperties(by, query);

    const ormEntity: Optional<TypeOrmApiKey> = await query.getOne();
    if (ormEntity) {
      domainEntity = TypeOrmApiKeyMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }


  private buildApiKeyQueryBuilder(): SelectQueryBuilder<TypeOrmApiKey> {
    return this.createQueryBuilder(this.apiKeyAlias).select();
  }

  private extendQueryWithByProperties(
    by: { keyValue?: string},
    query: SelectQueryBuilder<TypeOrmApiKey>
  ): void {
    switch (true) {
    case Boolean(by.keyValue):
      query.andWhere(`${this.apiKeyAlias}.keyValue = :keyValue`, { keyValue: by.keyValue });
      break;
    default:
      throw new Error(
        'Please provide either an keyValue to search for a apiKey.'
      );
    }
  }

}
