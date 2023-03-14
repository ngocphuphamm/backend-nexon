import { Permissions, StatusKey } from '@core/common/enums/ApiKeyEnum';

export type CreateApiKeyEntityPayload = {
  keyValue: string;
  version: string;
  permissions: Permissions;
  status: StatusKey;
  comments: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
