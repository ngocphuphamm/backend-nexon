import { Code } from '@core/common/code/Code';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { QueryBusPort } from '@core/common/port/message/QueryBusPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { Exception } from '@core/common/exception/Exception';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { EditToDoUseCase } from '@core/domain/todo/usecase/EditToDoUseCase';
import { EditToDoPort } from '@core/domain/todo/port/usecase/EditToDoPort';

export class EditToDoService implements EditToDoUseCase {
  constructor(
    private readonly toDoRepository: ToDoRepositoryPort,
    private readonly queryBus: QueryBusPort
  ) {}

  public async execute(payload: EditToDoPort): Promise<ToDoUseCaseDto> {
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

    await toDo.edit({
      title: payload.title,
      description: payload.description,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: payload.status,
      priority: payload.priority,
    });

    await this.toDoRepository.updateToDo(toDo);

    return ToDoUseCaseDto.newFormToDo(toDo);
  }
}
