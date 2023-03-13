import { Response } from 'express';
import { CoreApiResponse } from '../api/CoreApiResponse';
import { Code } from '@core/common/code/Code';
export const ResponseException = (error: any, response: Response) => {
  if (error.code !== 500) {
    return response
      .status(error.code)
      .json(CoreApiResponse.error(error.code, error.message));
  } else {
    return response
      .status(500)
      .json(CoreApiResponse.error(Code.INTERNAL_ERROR.code));
  }
};
