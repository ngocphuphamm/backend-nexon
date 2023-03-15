import {
  RepositoryFindOptions,
  RepositoryRemoveOptions,
  RepositoryUpdateManyOptions,
} from '@core/common/persistence/RepositoryOptions';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { ToDo } from '@core/domain/todo/entity/ToDo';

export interface ToDoRepositoryPort {
  addToDo(todo: ToDo): Promise<{ id: string }>;

  findToDo(
    by: { id?: string },
    options?: RepositoryFindOptions
  ): Promise<Optional<ToDo>>;

  findToDos(
    by: { userId?: string },
    options?: RepositoryFindOptions
  ): Promise<ToDo[]>;

  updateToDo(toDo: ToDo): Promise<void>;

  removeToDo(toDo: ToDo): Promise<void>;

  countToDosOfUser(
    by: { userId?: string },
    options?: RepositoryFindOptions
  ): Promise<number>;
}
