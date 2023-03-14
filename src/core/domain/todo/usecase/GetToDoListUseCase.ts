import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { GetToDoListPort } from '@core/domain/todo/port/usecase/GetToDoListPort';
export interface GetToDoListUseCase extends TransactionalUseCase<GetToDoListPort, ToDoUseCaseDto[]> {}
