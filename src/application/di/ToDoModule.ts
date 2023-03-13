import { Connection } from 'typeorm';
import { Module, Provider } from '@nestjs/common';

import { ToDoDITokens } from '@core/domain/todo/di/ToDoDITokens';
import { TypeOrmToDoRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/todo/TypeOrmToDoRepositoryAdapter';
import { ToDoController } from '@application/api/controller/ToDoController';
import { CreaterToDoService } from '@core/service/todo/usecase/CreateToDoService';
import { CoreDITokens } from '@core/common/di/CoreDIToken';
import { GetToDoService } from '@core/service/todo/usecase/GetToDoService';
import { EditToDoService } from '@core/service/todo/usecase/EditToDoService';

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
    provide: ToDoDITokens.CreateToDoUseCase,
    useFactory: (toDoRepository, queryBus) =>
      new CreaterToDoService(toDoRepository, queryBus),
    inject: [ToDoDITokens.ToDoRepository, CoreDITokens.QueryBus],
  },
  {
    provide: ToDoDITokens.GetToDoUseCase,
    useFactory: (toDoRepository) => new GetToDoService(toDoRepository),
    inject: [ToDoDITokens.ToDoRepository],
  },
  {
    provide: ToDoDITokens.EditToDoUseCase,
    useFactory: (toDoRepository, queryBus) =>
      new EditToDoService(toDoRepository, queryBus),
    inject: [ToDoDITokens.ToDoRepository],
  },
];

@Module({
  controllers: [ToDoController],
  providers: [...persistenceProviders, ...useCaseProviders],
})
export class ToDoModule {}
