import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { ApiKey } from '@core/domain/apiKey/entity/ApiKey';

export interface ApiKeyRepositoryPort {
  findApiKey(
    by: { keyValue?: string },
    options?: RepositoryFindOptions
  ): Promise<Optional<ApiKey>>;
}
