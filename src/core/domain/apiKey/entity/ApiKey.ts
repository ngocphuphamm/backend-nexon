import { IsDate, IsEnum, IsString } from 'class-validator';
import { v4 } from 'uuid';

import { Entity } from '@core/common/entity/Entity';
import { Permissions, StatusKey } from '@core/common/enums/ApiKeyEnum';
import { CreateApiKeyEntityPayload } from '@core/domain/apiKey/entity/type/CreateApiKeyEntityPayload';

export class ApiKey extends Entity<string> {
  @IsString()
  private keyValue: string;

  @IsString()
  private version: string;

  @IsString()
  @IsEnum(Permissions)
  private permissions: Permissions;

  @IsString()
  @IsEnum(StatusKey)
  private status: StatusKey;

  @IsString()
  private comments: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  constructor(payload: CreateApiKeyEntityPayload) {
    super();
    this.id = payload.id || v4();
    this.keyValue = payload.keyValue;
    this.version = payload.version;
    this.status = payload.status || StatusKey.ACTIVE;
    this.permissions = payload.permissions;
    this.comments = payload.comments;
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || new Date();
  }

  public getKeyValue(): string {
    return this.keyValue;
  }

  public getVersion(): string {
    return this.version;
  }

  public getStatus(): StatusKey {
    return this.status;
  }

  public getPermissions(): Permissions {
    return this.permissions;
  }

  public getComments(): string {
    return this.comments;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static async new(payload: CreateApiKeyEntityPayload): Promise<ApiKey> {
    const toDo: ApiKey = new ApiKey(payload);
    await toDo.validate();

    return toDo;
  }

}
