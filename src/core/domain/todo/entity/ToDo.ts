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
import { EditToDoEntityPayload } from './type/EditToDoEntityPayload';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBefore(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isBefore',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (relatedValue instanceof Date && value instanceof Date) {
            return value < relatedValue;
          }
          return false;
        },
      },
    });
  };
}

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
  @IsBefore('endTime', {
    message: 'Start time must be before end time',
  })
  private startTime: Date;

  @IsDate()
  private endTime: Date;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

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

  public async edit(payload: EditToDoEntityPayload): Promise<void> {
    const currentDate: Date = new Date();
    switch (true) {
    case Boolean(payload.title):
      this.title = payload.title!;
      break;
    case Boolean(payload.description):
      this.description = payload.description!;
      break;
    case Boolean(payload.startTime):
      this.startTime = payload.startTime!;
      break;
    case Boolean(payload.endTime):
      this.endTime = payload.endTime!;
      break;
    case Boolean(payload.priority):
      this.priority = payload.priority!;
      break;
    case Boolean(payload.status):
      this.status = payload.status!;
      break;
    default:
        // default behavior if none of the cases match
    }

    console.log(this);
    await this.validate();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(): Promise<void> {}
}
