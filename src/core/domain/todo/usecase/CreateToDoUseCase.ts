import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { CreateToDoPort } from '@core/domain/todo/port/usecase/CreateToDoPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
export interface CreateToDoUseCase extends TransactionalUseCase<CreateToDoPort, ToDoUseCaseDto> {}
