import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { RemoveToDoUseCase } from '@core/domain/todo/usecase/RemoveToDoUseCase';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { RemoveToDoPort } from '@core/domain/todo/port/usecase/RemoveToDoPort';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { ToDo } from '@core/domain/todo/entity/ToDo';
export class RemoveToDoService implements RemoveToDoUseCase {
  
  constructor(
    private readonly toDoRepository: ToDoRepositoryPort,
  ) {}
  
  public async execute(payload: RemoveToDoPort): Promise<void> {
    const toDo: ToDo = CoreAssert.notEmpty(
      await this.toDoRepository.findToDo({id: payload.toDoId}),
      Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'To Do not found.'})
    );
  
    const hasAccess: boolean = payload.executorId === toDo.getUser().getId();
    CoreAssert.isTrue(hasAccess, Exception.new({code: Code.ACCESS_DENIED_ERROR}));
    
    await this.toDoRepository.removeToDo(toDo);
  }
  
}
