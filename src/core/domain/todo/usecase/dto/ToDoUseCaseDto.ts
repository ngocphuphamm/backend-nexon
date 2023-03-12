import { Exclude, Expose, plainToClass } from 'class-transformer';
import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { ToDoUser } from '@core/domain/todo/entity/ToDoUser';


@Exclude()
export class ToDoUseCaseDto {
  @Expose()
  public id: string;

  public user: { id: string; email: string };

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public status: ToDoStatus;

  @Expose()
  public priority: ToDoPriority;

  public createdAt: Date;

  public updatedAt: Date;

  public static newFormToDo(todo: ToDo): ToDoUseCaseDto {
    const dto: ToDoUseCaseDto = plainToClass(ToDoUseCaseDto, todo);
    const toDoUser: ToDoUser = todo.getUser();

    dto.user = {
      id: toDoUser.getId(),
      email: toDoUser.getEmail(),
    };

    dto.createdAt = todo.getCreatedAt();
    dto.updatedAt = todo.getUpdatedAt();

    return dto;
  }
}
