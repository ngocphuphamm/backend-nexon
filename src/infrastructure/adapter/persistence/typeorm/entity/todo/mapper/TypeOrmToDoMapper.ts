// import { TypeOrmTodo } from '@infrastructure/adapter/persistence/typeorm/entity/todo/TypeOrmTodo';
// import { Todo } from '@core/domain/todo/entity/Todo';

// export class TypeOrmTodoMapper {
//   public static toOrmEntity(domainTodo: Todo): TypeOrmTodo {
//     const ormTodo: TypeOrmTodo = new TypeOrmTodo();

//     ormTodo.id = domainTodo.getId();
//     ormTodo.title = domainTodo.getTitle();
//     ormTodo.description = domainTodo.getDescription();
//     ormTodo.startTime = domainTodo.getStartTime();
//     ormTodo.endTime = domainTodo.getEndTime();
//     ormTodo.status = domainTodo.getStatus();
//     ormTodo.priority = domainTodo.getPriority();
//     ormTodo.userId = domainTodo.getUserId();
//     ormTodo.createdAt = domainTodo.getCreatedAt();
//     ormTodo.updatedAt = domainTodo.getUpdatedAt() as Date;

//     return ormTodo;
//   }

//   public static toOrmEntities(domainTodos: Todo[]): TypeOrmTodo[] {
//     return domainTodos.map((domainTodo) => this.toOrmEntity(domainTodo));
//   }

//   public static toDomainEntity(ormTodo: TypeOrmTodo): Todo {
//     const domainTodo: Todo = new Todo({
//       title: ormTodo.title,
//       description: ormTodo.description,
//       startTime: ormTodo.startTime,
//       endTime: ormTodo.endTime,
//       status: ormTodo.status,
//       priority: ormTodo.priority,
//       id: ormTodo.id,
//       userId: ormTodo.userId,
//       createdAt: ormTodo.createdAt,
//       updatedAt: ormTodo.updatedAt || null,
//     });

//     return domainTodo;
//   }

//   public static toDomainEntities(ormTodos: TypeOrmTodo[]): Todo[] {
//     return ormTodos.map((ormTodo) => this.toDomainEntity(ormTodo));
//   }
// }
