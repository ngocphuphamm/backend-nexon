import { TransactionalUseCase } from '@core/common/usecase/TransactionalUseCase';
import { RemoveToDoPort } from '@core/domain/todo/port/usecase/RemoveToDoPort';

export interface RemoveToDoUseCase extends TransactionalUseCase<RemoveToDoPort, void> {}
