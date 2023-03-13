import { Code } from '@core/common/code/Code';
import { CreateToDoUseCase } from '@core/domain/todo/usecase/CreateToDoUseCase';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { QueryBusPort } from '@core/common/port/message/QueryBusPort';
import { CreateToDoPort } from '@core/domain/todo/port/usecase/CreateToDoPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/GetUserPreviewQuery';
import { CoreAssert } from '@core/common/utils/assert/CoreAssert';
import { Exception } from '@core/common/exception/Exception';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { ToDoUser } from '@core/domain/todo/entity/ToDoUser';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/GetUserPreviewQueryResult';

export class CreaterToDoService implements CreateToDoUseCase {
  constructor(
    private readonly postRepository: ToDoRepositoryPort,
    private readonly queryBus: QueryBusPort
  ) {}

  public async execute(payload: CreateToDoPort): Promise<ToDoUseCaseDto> {
    const toDoUser: GetUserPreviewQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(
        GetUserPreviewQuery.new({ id: payload.executorId })
      ),
      Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        overrideMessage: 'To do user not found.',
      })
    );
    const toDo: ToDo = await ToDo.new({
      title: payload.title,
      description: payload.description,
      startTime: payload.startTime,
      endTime: payload.endTime,
      priority: payload.priority,
      status: payload.status,
      user: await ToDoUser.new(toDoUser.id, toDoUser.email),
    });

    await this.postRepository.addToDo(toDo);

    return ToDoUseCaseDto.newFormToDo(toDo);
  }
}
