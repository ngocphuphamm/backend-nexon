import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InsertResult,EntityRepository } from 'typeorm';

import { TypeOrmToDo } from '@infrastructure/adapter/persistence/typeorm/entity/todo/TypeOrmToDo';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { TypeOrmToDoMapper } from '@infrastructure/adapter/persistence/typeorm/entity/todo/mapper/TypeOrmToDoMapper';

@EntityRepository(TypeOrmToDo)
export class TypeOrmToDoRepositoryAdapter
  extends BaseRepository<TypeOrmToDo>
  implements ToDoRepositoryPort
{
  private readonly toDoAlias: string = 'todos';

  public async addToDo(toDo: ToDo): Promise<{ id: string }> {
    const ormToDo: TypeOrmToDo = TypeOrmToDoMapper.toOrmEntity(toDo);

    const insertResult: InsertResult = await this.createQueryBuilder(
      this.toDoAlias
    )
      .insert()
      .into(TypeOrmToDo)
      .values([ormToDo])
      .execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }
}
