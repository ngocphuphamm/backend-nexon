import {
  IsDate,
  IsEnum,
  IsInstance,
  IsOptional,
  IsString,
} from 'class-validator';
import { v4 } from 'uuid';

import { Entity } from '@core/common/entity/Entity';
import { RemovableEntity } from '@core/common/entity/RemoveableEntity';
import { ToDoUser } from '@core/domain/todo/entity/ToDoUser';
import { ToDoPriority, ToDoStatus } from '@core/common/enums/ToDoEnums';
import { CreateToDorEntityPayload } from '@core/domain/todo/entity/type/CreateToDoEntityPayload';

export class ToDo extends Entity<string> implements RemovableEntity {
  @IsInstance(ToDoUser)
  private readonly user: ToDoUser;

  @IsString()
  private title: string;

  @IsString()
  private description: string;

  @IsEnum(ToDoStatus)
  private status: ToDoStatus;

  @IsEnum(ToDoPriority)
  private priority: ToDoPriority;

  @IsDate()
  private readonly startTime: Date;

  @IsDate()
  private readonly endTime: Date;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private readonly updatedAt: Date;

  constructor(payload: CreateToDorEntityPayload) {
    super();

    this.user = payload.user;
    this.title = payload.title;
    this.description = payload.description;
    this.id = v4();
    this.status = payload.status || ToDoStatus.TODO;
    this.priority = payload.priority || ToDoPriority.LOW;
    this.startTime = payload.startTime;
    this.endTime = payload.endTime;
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.updatedAt || new Date();
  }

  public getUser(): ToDoUser {
    return this.user;
  }

  public getPriority(): ToDoPriority {
    return this.priority;
  }

  public getDescription(): string {
    return this.description;
  }
  
  public getTitle(): string {
    return this.title;
  }

  public getStatus(): ToDoStatus {
    return this.status;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public getEndTime(): Date {
    return this.endTime;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static async new(payload: CreateToDorEntityPayload): Promise<ToDo> {
    const toDo: ToDo = new ToDo(payload);
    await toDo.validate();

    return toDo;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(): Promise<void> {}
}
