import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { Pagination } from '@core/domain/todo/usecase/dto/Pagination';
import { Expose } from 'class-transformer';

export class ToDoListPaginationDto {
  @Expose()
  public pagination: Pagination;

  @Expose()
  public listToDo: ToDoUseCaseDto[];
}
