import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetToDoPort } from '@core/domain/todo/port/usecase/GetToDoPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class GetToDoAdapter
  extends UseCaseValidatableAdapter
  implements GetToDoPort
{
  @Expose()
  @IsUUID()
  public executorId: string;

  @Expose()
  @IsUUID()
  public toDoId: string;

  public static async new(payload: GetToDoPort): Promise<GetToDoAdapter> {
    const adapter: GetToDoAdapter = plainToClass(GetToDoAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
