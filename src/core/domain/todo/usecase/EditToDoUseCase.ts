import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { EditToDoPort } from '@core/domain/todo/port/usecase/EditToDoPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
export interface EditToDoUseCase extends TransactionalUseCase<EditToDoPort, ToDoUseCaseDto> {}
