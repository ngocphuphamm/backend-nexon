import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { GetToDoUseCase } from '@core/domain/todo/usecase/GetToDoUseCase';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { GetToDoPort } from '@core/domain/todo/port/usecase/GetToDoPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
export class GetToDoService implements GetToDoUseCase {
  constructor(private readonly toDoRepository: ToDoRepositoryPort) {}

  public async execute(payload: GetToDoPort): Promise<ToDoUseCaseDto> {
    const toDo: ToDo = CoreAssert.notEmpty(
      await this.toDoRepository.findToDo({ id: payload.toDoId }),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'To Do not found.',
      })
    );

    const hasAccess: boolean = payload.executorId === toDo.getUser().getId();
    CoreAssert.isTrue(
      hasAccess,
      Exception.new({ code: Code.ACCESS_DENIED_ERROR })
    );

    return ToDoUseCaseDto.newFormToDo(toDo);
  }
}
