import { ApiKey } from '@core/domain/apiKey/entity/ApiKey';
import { TypeOrmApiKey } from '@infrastructure/adapter/persistence/typeorm/entity/apikey/TypeOrmApiKey';

export class TypeOrmApiKeyMapper {
  public static toOrmEntity(domainApiKey: ApiKey): TypeOrmApiKey {
    const ormApiKey: TypeOrmApiKey = new TypeOrmApiKey();

    ormApiKey.id = domainApiKey.getId();
    ormApiKey.keyValue = domainApiKey.getKeyValue();
    ormApiKey.version = domainApiKey.getVersion();
    ormApiKey.permissions = domainApiKey.getPermissions();
    ormApiKey.status = domainApiKey.getStatus();
    ormApiKey.comments = domainApiKey.getComments();
    ormApiKey.createdAt = domainApiKey.getCreatedAt();
    ormApiKey.updatedAt = domainApiKey.getUpdatedAt() as Date;

    return ormApiKey;
  }

  public static toDomainEntity(ormApiKey: TypeOrmApiKey): ApiKey {
    const domainApiKey: ApiKey = new ApiKey({
      id: ormApiKey.id,
      keyValue: ormApiKey.keyValue,
      version: ormApiKey.version,
      permissions: ormApiKey.permissions,
      comments: ormApiKey.comments,
      status: ormApiKey.status,
      createdAt: ormApiKey.createdAt,
      updatedAt: ormApiKey.updatedAt,
    });

    return domainApiKey;
  }

  public static toDomainEntities(ormApiKeys: TypeOrmApiKey[]): ApiKey[] {
    return ormApiKeys.map((ormApiKey) => this.toDomainEntity(ormApiKey));
  }
}
