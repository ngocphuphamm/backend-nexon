import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {TypeOrmToDo} from '@infrastructure/adapter/persistence/typeorm/entity/todo/TypeOrmToDo';


export class TypeOrmToDoRepositoryAdapter extends BaseRepository<TypeOrmToDo>
{

}