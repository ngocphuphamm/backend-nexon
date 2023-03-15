import { GetToDoListUseCase } from '@core/domain/todo/usecase/GetToDoListUseCase';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { GetToDoListPort } from '@core/domain/todo/port/usecase/GetToDoListPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { ToDo } from '@core/domain/todo/entity/ToDo';

export class GetToDolistService implements GetToDoListUseCase {
  constructor(private readonly toDoRepository: ToDoRepositoryPort) {}

  public async execute(payload: GetToDoListPort): Promise<ToDoUseCaseDto[]> {
    const todos: ToDo[] = await this.toDoRepository.findToDos(
      {
        userId: payload.executorId,
      },
      {
        limit: payload.limit,
        page: payload.page,
      }
    );
     
    return ToDoUseCaseDto.newListFromToDo(todos);
  }
}
