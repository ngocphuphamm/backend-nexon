# To Do List


## Running

```
Start application - npm run start

Expose ./env/local.app.env and start application - npm run start:local

API documentation will be available on the endpoint GET http://localhost:3002/documentation

OR 

ACCESS 
http://194.163.180.21/api/
http://194.163.180.21/documentation
```
## Database

### MySql
![335956412_886576025760498_5589930675801656828_n](https://user-images.githubusercontent.com/87811387/224975091-cafffcaa-bda7-4a35-a36b-29663fbd4314.png)

![336019315_2333863846795026_6530746572192490288_n](https://user-images.githubusercontent.com/87811387/224975100-055f38cb-17b5-4239-88c7-c0b1f729245e.png)


### Redis
![336209303_594737415581906_8434204677259970474_n](https://user-images.githubusercontent.com/87811387/224975905-bada3c66-41c6-4426-97f9-9015e56beca1.png)




### Structure 
```
.
├── application
│   ├── api
│   │   ├── auth
│   │   │   ├── AuthService.ts
│   │   │   ├── decorator
│   │   │   │   └── HttpUser.ts
│   │   │   ├── guard
│   │   │   │   ├── ApiKeyAuthGuard.ts
│   │   │   │   ├── JwtAuthGuard.ts
│   │   │   │   └── LocalAuthGuard.ts
│   │   │   ├── passport
│   │   │   │   ├── ApiKeyStrategy.ts
│   │   │   │   ├── JwtStrategy.ts
│   │   │   │   └── LocalStrategy.ts
│   │   │   └── type
│   │   │       └── AuthTypes.ts
│   │   ├── controller
│   │   │   ├── AuthController.ts
│   │   │   ├── documentation
│   │   │   │   ├── auth
│   │   │   │   │   ├── LoginBody.ts
│   │   │   │   │   ├── Logout.ts
│   │   │   │   │   ├── ModelToken.ts
│   │   │   │   │   ├── RefreshToken.ts
│   │   │   │   │   ├── RegisterBody.ts
│   │   │   │   │   ├── ReponseRegisterBody.ts
│   │   │   │   │   └── ResponseToken.ts
│   │   │   │   ├── common
│   │   │   │   │   └── HttpRestApiResponse.ts
│   │   │   │   ├── todo
│   │   │   │   │   ├── CreateToDo.ts
│   │   │   │   │   ├── EditToDoBody.ts
│   │   │   │   │   ├── GetToDoListQuery.ts
│   │   │   │   │   ├── ModelToDo.ts
│   │   │   │   │   ├── ResonseToDoList.ts
│   │   │   │   │   └── ResponseToDo.ts
│   │   │   │   └── user
│   │   │   │       ├── ModelUser.ts
│   │   │   │       └── ResponseUser.ts
│   │   │   └── ToDoController.ts
│   │   ├── exception-filter
│   │   │   └── NestHttpExceptionFilter.ts
│   │   └── interceptor
│   │       └── NestHttpLoggingInterceptor.ts
│   ├── di
│   │   ├── AuthModule.ts
│   │   ├── InfrastructureModule.ts
│   │   └── ToDoModule.ts
│   └── ServerApplication.ts
├── core
│   ├── common
│   │   ├── adapter
│   │   │   └── usecase
│   │   │       └── UseCaseValidatableAdapter.ts
│   │   ├── api
│   │   │   └── CoreApiResponse.ts
│   │   ├── code
│   │   │   └── Code.ts
│   │   ├── di
│   │   │   └── CoreDIToken.ts
│   │   ├── entity
│   │   │   ├── Entity.ts
│   │   │   └── RemoveableEntity.ts
│   │   ├── enums
│   │   │   ├── ApiKeyEnum.ts
│   │   │   └── ToDoEnums.ts
│   │   ├── exception
│   │   │   ├── Exception.ts
│   │   │   └── ResponseException.ts
│   │   ├── message
│   │   │   ├── command
│   │   │   ├── event
│   │   │   └── query
│   │   │       ├── queries
│   │   │       │   ├── task
│   │   │       │   └── user
│   │   │       │       ├── GetUserPreviewQuery.ts
│   │   │       │       └── result
│   │   │       │           └── GetUserPreviewQueryResult.ts
│   │   │       └── QueryHandler.ts
│   │   ├── persistence
│   │   │   └── RepositoryOptions.ts
│   │   ├── port
│   │   │   └── message
│   │   │       ├── CommandBusPort.ts
│   │   │       ├── EventBusPort.ts
│   │   │       └── QueryBusPort.ts
│   │   ├── service
│   │   ├── type
│   │   │   └── CommonTypes.ts
│   │   ├── usecase
│   │   │   ├── TransactionalUseCase.ts
│   │   │   └── UseCase.ts
│   │   └── utils
│   │       ├── assert
│   │       │   └── CoreAssert.ts
│   │       ├── class-validator
│   │       │   └── ClassValidator.ts
│   │       └── helper
│   │           └── Pagination.ts
│   ├── domain
│   │   ├── apiKey
│   │   │   ├── di
│   │   │   │   └── ApiKeyDITokens.ts
│   │   │   ├── entity
│   │   │   │   ├── ApiKey.ts
│   │   │   │   └── type
│   │   │   │       └── CreateApiKeyEntityPayload.ts
│   │   │   └── port
│   │   │       ├── persistence
│   │   │       │   └── ApiKeyRepositoryPort.ts
│   │   │       └── usecase
│   │   ├── todo
│   │   │   ├── di
│   │   │   │   └── ToDoDITokens.ts
│   │   │   ├── entity
│   │   │   │   ├── ToDo.ts
│   │   │   │   ├── ToDoUser.ts
│   │   │   │   └── type
│   │   │   │       ├── CreateToDoEntityPayload.ts
│   │   │   │       └── EditToDoEntityPayload.ts
│   │   │   ├── port
│   │   │   │   ├── persistence
│   │   │   │   │   └── ToDoRepositoryPort.ts
│   │   │   │   └── usecase
│   │   │   │       ├── CreateToDoPort.ts
│   │   │   │       ├── EditToDoPort.ts
│   │   │   │       ├── GetToDoListPort.ts
│   │   │   │       ├── GetToDoPort.ts
│   │   │   │       └── RemoveToDoPort.ts
│   │   │   └── usecase
│   │   │       ├── CreateToDoUseCase.ts
│   │   │       ├── dto
│   │   │       │   └── ToDoUseCaseDto.ts
│   │   │       ├── EditToDoUseCase.ts
│   │   │       ├── GetToDoListUseCase.ts
│   │   │       ├── GetToDoUseCase.ts
│   │   │       └── RemoveToDoUseCase.ts
│   │   └── user
│   │       ├── di
│   │       │   └── UserDIToken.ts
│   │       ├── entity
│   │       │   ├── type
│   │       │   │   └── CreateUserEntityPayload.ts
│   │       │   └── User.ts
│   │       ├── handler
│   │       │   └── GetUserPreviewQueryHandler.ts
│   │       ├── port
│   │       │   ├── persistence
│   │       │   │   └── UserRepositoryPort.ts
│   │       │   └── usecase
│   │       │       ├── CreateUserPort.ts
│   │       │       └── GetUserPort.ts
│   │       └── usecase
│   │           ├── CreateUserUseCase.ts
│   │           ├── dto
│   │           │   └── UserUseCaseDto.ts
│   │           └── GetUserUseCase.ts
│   └── service
│       ├── todo
│       │   ├── handler
│       │   └── usecase
│       │       ├── CreateToDoService.ts
│       │       ├── EditToDoService.ts
│       │       ├── GetToDoListService.ts
│       │       ├── GetToDoService.ts
│       │       └── RemoveToDoService.ts
│       └── user
│           ├── handler
│           │   └── HandleGetUserPreviewQueryService.ts
│           └── usecase
│               ├── CreateUserService.ts
│               └── GetUserService.ts
├── infrastructure
│   ├── adapter
│   │   ├── mesage
│   │   │   ├── NestCommandBusAdapter.ts
│   │   │   ├── NestEventBusAdapter.ts
│   │   │   └── NestQueryBusAdapter.ts
│   │   ├── persistence
│   │   │   └── typeorm
│   │   │       ├── entity
│   │   │       │   ├── apikey
│   │   │       │   │   ├── mapper
│   │   │       │   │   │   └── TypeOrmApiKeyMapper.ts
│   │   │       │   │   └── TypeOrmApiKey.ts
│   │   │       │   ├── todo
│   │   │       │   │   ├── mapper
│   │   │       │   │   │   └── TypeOrmToDoMapper.ts
│   │   │       │   │   └── TypeOrmToDo.ts
│   │   │       │   └── user
│   │   │       │       ├── mapper
│   │   │       │       │   └── TypeOrmUserMapper.ts
│   │   │       │       └── TypeOrmUser.ts
│   │   │       ├── repository
│   │   │       │   ├── apiKey
│   │   │       │   │   └── TypeOrmApiKeyRepositoryAdapter.ts
│   │   │       │   ├── todo
│   │   │       │   │   └── TypeOrmToDoRepositoryAdapter.ts
│   │   │       │   └── user
│   │   │       │       └── TypeOrmUserRepositoryAdapter.ts
│   │   │       ├── TypeOrmDirectory.ts
│   │   │       └── usecase
│   │   └── usecase
│   │       ├── todo
│   │       │   ├── CreateToDoAdapter.ts
│   │       │   ├── EditToDoAdapter.ts
│   │       │   ├── GetToDoAdapter.ts
│   │       │   ├── GetToDoListAdapter.ts
│   │       │   └── RemoveToDoAdapter.ts
│   │       └── user
│   │           └── CreateUserAdapter.ts
│   ├── config
│   │   ├── ApiServerConfig.ts
│   │   └── DatabaseConfig.ts
│   ├── handler
│   │   ├── todo
│   │   │   └── NestWrapperGetUserPreviewQueryHandler.ts
│   │   └── user
│   │       └── NestWrapperGetUserPreviewQueryHandler.ts
│   └── transaction
│       └── TransactionalUseCaseWrapper.ts
└── Main.ts

```
