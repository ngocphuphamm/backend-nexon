// import { Connection } from 'typeorm';

// import { ToDoDITokens } from '@core/domain/todo/di/ToDoDITokens';
// import { TypeOrmToDoRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/todo/TypeOrmToDoRepositoryAdapter';
// const persistenceProviders: Provider[] = [
//   {
//     provide: ToDoDITokens.ToDoRepository,
//     useFactory: (connection: any) =>
//       connection.getCustomRepository(TypeOrmToDoRepositoryAdapter),
//     inject: [Connection],
//   },
// ];
