import { RepositoryFindOptions } from '../../persistence/RepositoryOptions';
import { Exception } from '../../exception/Exception';
import { Code } from '../../code/Code';
import { Pagination } from '../../type/CommonTypes';


export const pagination = ({ page, limit }: RepositoryFindOptions) : Pagination => {
  if (!page || !limit)
    throw Exception.new({
      code: Code.BAD_REQUEST_ERROR,
      overrideMessage: `Invalid page ${page} or ${limit}`,
    });
  const skip = (page - 1) * limit;
  const take = limit;
  return {
    skip,
    take
  };
};
