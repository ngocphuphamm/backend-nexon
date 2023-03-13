import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, response } from 'express';
const WRONG_CERDENTIALS = Code.WRONG_CREDENTIALS_ERROR.message;
@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();
    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message
    );

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    if (error.message == WRONG_CERDENTIALS) {
      errorResponse  = CoreApiResponse.error(
        Code.WRONG_CREDENTIALS_ERROR.code,
        Code.WRONG_CREDENTIALS_ERROR.message
      );
    }

    if (ApiServerConfig.LOG_ENABLE) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `Error: ${errorResponse.message}`;

      Logger.error(message);
    }
    response.status(errorResponse.code).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(
        error.getStatus(),
        error.message,
        null
      );
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(
        error.code,
        error.message,
        error.data
      );
    }

    return errorResponse;
  }
}
