import { TypeOrmToDo } from '@infrastructure/adapter/persistence/typeorm/entity/todo/TypeOrmToDo';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { ToDoUser } from '@core/domain/todo/entity/ToDoUser';

export class TypeOrmToDoMapper {
  public static toOrmEntity(domainTodo: ToDo): TypeOrmToDo {
    const ormTodo: TypeOrmToDo = new TypeOrmToDo();

    ormTodo.id = domainTodo.getId();
    ormTodo.title = domainTodo.getTitle();
    ormTodo.description = domainTodo.getDescription();
    ormTodo.startTime = domainTodo.getStartTime();
    ormTodo.endTime = domainTodo.getEndTime();
    ormTodo.status = domainTodo.getStatus();
    ormTodo.priority = domainTodo.getPriority();
    ormTodo.userId = domainTodo.getUser().getId();
    ormTodo.createdAt = domainTodo.getCreatedAt();
    ormTodo.updatedAt = domainTodo.getUpdatedAt() as Date;

    return ormTodo;
  }

  public static toOrmEntities(domainTodos: ToDo[]): TypeOrmToDo[] {
    return domainTodos.map((domainTodo) => this.toOrmEntity(domainTodo));
  }

  public static toDomainEntity(ormTodo: TypeOrmToDo): ToDo {
    const domainTodo: ToDo = new ToDo({
      title: ormTodo.title,
      description: ormTodo.description,
      startTime: ormTodo.startTime,
      endTime: ormTodo.endTime,
      status: ormTodo.status,
      priority: ormTodo.priority,
      id: ormTodo.id,
      user: new ToDoUser(ormTodo.user.id, ormTodo.user.email),
      createdAt: ormTodo.createdAt,
      updatedAt: ormTodo.updatedAt,
    });

    return domainTodo;
  }

  public static toDomainEntities(ormTodos: TypeOrmToDo[]): ToDo[] {
    return ormTodos.map((ormTodo) => this.toDomainEntity(ormTodo));
  }
}
