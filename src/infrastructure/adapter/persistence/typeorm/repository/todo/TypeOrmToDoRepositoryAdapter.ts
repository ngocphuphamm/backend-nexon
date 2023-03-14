import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InsertResult, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { TypeOrmToDo } from '@infrastructure/adapter/persistence/typeorm/entity/todo/TypeOrmToDo';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { TypeOrmToDoMapper } from '@infrastructure/adapter/persistence/typeorm/entity/todo/mapper/TypeOrmToDoMapper';
import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import {
  Optional,
  Pagination,
} from '../../../../../../core/common/type/CommonTypes';
import { TypeOrmUser } from '../../entity/user/TypeOrmUser';
import { pagination } from '../../../../../../core/common/utils/helper/Pagination';
import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';

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

  public async findToDo(
    by: { id?: string },
    options: RepositoryFindOptions = {}
  ): Promise<Optional<ToDo>> {
    let domainEntity: Optional<ToDo>;

    const query: SelectQueryBuilder<TypeOrmToDo> = this.buildToDoQueryBuilder();
    this.extendQueryWithByProperties(by, query);

    const ormEntity: Optional<TypeOrmToDo> = await query.getOne();
    if (ormEntity) {
      domainEntity = TypeOrmToDoMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  public async findToDos(
    by: { userId?: string },
    options: RepositoryFindOptions = {}
  ): Promise<ToDo[]> {
    const query: SelectQueryBuilder<TypeOrmToDo> = this.buildToDoQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const { skip, take }: Pagination = await pagination(options);
    query.skip(skip).take(take);

    const ormToDos: TypeOrmToDo[] = await query.getMany();
    const domainToDos: ToDo[] = TypeOrmToDoMapper.toDomainEntities(ormToDos);

    return domainToDos;
  }

  public async updateToDo(toDo: ToDo): Promise<void> {
    const ormToDo: TypeOrmToDo = TypeOrmToDoMapper.toOrmEntity(toDo);
    await this.update(ormToDo.id, ormToDo);
  }

  public async removeToDo(toDo: ToDo): Promise<void> {
    await toDo.remove();
    const ormToDo: TypeOrmToDo = TypeOrmToDoMapper.toOrmEntity(toDo);

    await this.delete(ormToDo);
  }

  private buildToDoQueryBuilder(): SelectQueryBuilder<TypeOrmToDo> {
    return this.createQueryBuilder(this.toDoAlias)
      .select()
      .leftJoinAndMapOne(
        `${this.toDoAlias}.user`,
        TypeOrmUser,
        'user',
        `${this.toDoAlias}.userId = user.id`
      );
  }

  private extendQueryWithByProperties(
    by: {
      id?: string;
      userId?: string;
      status?: ToDoStatus;
      priority?: ToDoPriority;
    },
    query: SelectQueryBuilder<TypeOrmToDo>
  ): void {
    switch (true) {
    case Boolean(by.id):
      query.andWhere(`${this.toDoAlias}.id = :id`, { id: by.id });
      break;
    case Boolean(by.userId):
      query.andWhere(`${this.toDoAlias}.userId = :userId`, {
        userId: by.userId,
      });
      break;
    case Boolean(by.status):
      query.andWhere(`${this.toDoAlias}.status = :status`, {
        status: by.status,
      });
      break;
    case Boolean(by.priority):
      query.andWhere(`${this.toDoAlias}.priority = :priority`, {
        priority: by.priority,
      });
      break;
    default:
      break;
    }
  }
}
