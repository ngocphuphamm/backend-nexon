/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exclude, Expose, plainToClass } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsDate,
  ValidateIf,
} from 'class-validator';

import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
import { CreateToDoPort } from '@core/domain/todo/port/usecase/CreateToDoPort';

@Exclude()
export class CreateToDoAdapter
  extends UseCaseValidatableAdapter
  implements CreateToDoPort
{
  @Expose()
  @IsUUID()
  public executorId: string;

  @Expose()
  @IsString()
  public title: string;

  @Expose()
  @IsString()
  public description: string;

  @Expose()
  @IsDate()
  public startTime: Date;

  @Expose()
  @IsDate()
  public endTime: Date;

  @Expose()
  @IsString()
  public status: ToDoStatus;

  @Expose()
  @IsString()
  public priority: ToDoPriority;

  @ValidateIf(
    (object, value) => object.startTime !== undefined && value !== undefined
  )

  public static async new(payload: CreateToDoPort): Promise<CreateToDoAdapter> {
    const adapter: CreateToDoAdapter = plainToClass(CreateToDoAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
