import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { GetToDoListPort } from '@core/domain/todo/port/usecase/GetToDoListPort';
import { ToDoListPaginationDto } from './dto/ToDoListPaginationDto';
export interface GetToDoListUseCase extends TransactionalUseCase<GetToDoListPort, ToDoListPaginationDto> {}
