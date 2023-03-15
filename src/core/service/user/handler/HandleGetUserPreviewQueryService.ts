import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/GetUserPreviewQuery';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/GetUserPreviewQueryResult';
import { Optional } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { GetUserPreviewQueryHandler } from '@core/domain/user/handler/GetUserPreviewQueryHandler';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';

export class HandleGetUserPreviewQueryService implements GetUserPreviewQueryHandler
{
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}
  public async handle(
    query: GetUserPreviewQuery,
  ): Promise<Optional<GetUserPreviewQueryResult>> {
    let queryResult: Optional<GetUserPreviewQueryResult>;

    const user: Optional<User> = await this.userRepositoryPort.findUser(
      query.by,
      query.options,
    );

    if (user) {
      queryResult = GetUserPreviewQueryResult.new(
        user.getId(),
        user.getEmail(),
      );
    }
    return queryResult;
  }
}
