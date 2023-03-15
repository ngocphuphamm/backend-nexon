import { GetToDoListUseCase } from '@core/domain/todo/usecase/GetToDoListUseCase';
import { ToDoRepositoryPort } from '@core/domain/todo/port/persistence/ToDoRepositoryPort';
import { GetToDoListPort } from '@core/domain/todo/port/usecase/GetToDoListPort';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { ToDo } from '@core/domain/todo/entity/ToDo';
import { ToDoListPaginationDto } from '@core/domain/todo/usecase/dto/ToDoListPaginationDto';

export class GetToDolistService implements GetToDoListUseCase {
  constructor(private readonly toDoRepository: ToDoRepositoryPort) {}

  public async execute({
    limit,
    page,
    executorId,
  }: GetToDoListPort): Promise<ToDoListPaginationDto> {
    const todos: ToDo[] = await this.toDoRepository.findToDos(
      {
        userId: executorId,
      },
      {
        limit: limit,
        page: page,
      }
    );
    const sumToDo: number = await this.toDoRepository.countToDosOfUser({
      userId: executorId,
    });
    const toDoUseCaseDto: ToDoUseCaseDto[] =
      ToDoUseCaseDto.newListFromToDo(todos);
    const sum = Math.ceil(sumToDo / limit);
    return {
      pagination: {
        page: page,
        limit: limit,
        sumPage: sum > 0 ? sum : 1,
      },
      listToDo: toDoUseCaseDto,
    };
  }
}
