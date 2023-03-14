import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { ApiKey } from '@core/domain/apiKey/entity/ApiKey';
import { AuthService } from '@application/api/auth/AuthService';
import { Permissions, StatusKey } from '@core/common/enums/ApiKeyEnum';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: 'x-api-key',
        prefix: 'ApiKey',
      },
      false
    );
  }

  public async validate(keyValue: string): Promise<ApiKey> {
    const apiKey: ApiKey = CoreAssert.notEmpty(
      await this.authService.getApiKey({ keyValue: keyValue }),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    );

    const status = apiKey.getStatus().toLowerCase();
    const permissions = apiKey.getPermissions().toLowerCase();

    if (
      status === StatusKey.ACTIVE.toLowerCase() &&
      (permissions === Permissions.GENERAL.toLowerCase() ||
        permissions === Permissions.VIP.toLowerCase())
    ) {
      return apiKey;
    }
    throw Exception.new({ code: Code.UNAUTHORIZED_ERROR });
  }
}
