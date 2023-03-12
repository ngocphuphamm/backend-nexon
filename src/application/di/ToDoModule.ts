import { Connection } from 'typeorm';
import { Module, Provider } from '@nestjs/common';

import { ToDoDITokens } from '@core/domain/todo/di/ToDoDITokens';
import { TypeOrmToDoRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/todo/TypeOrmToDoRepositoryAdapter';
import {ToDoController} from'@application/api/controller/ToDoController';

const persistenceProviders: Provider[] = [
  {
    provide: ToDoDITokens.ToDoRepository,
    useFactory: (connection: any) =>
      connection.getCustomRepository(TypeOrmToDoRepositoryAdapter),
    inject: [Connection],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide   : ToDoDITokens.CreateToDoUseCase,
    // to do
    useFactory: (toDoRepository) => new CreateToDoService(toDoRepository),
    inject    : [ToDoDITokens.ToDoRepository]
  },
];


@Module({
  controllers: [ToDoController],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders
  ],
})
export class ToDoModule {}
