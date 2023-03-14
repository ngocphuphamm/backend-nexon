import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { GetToDoListPort } from '@core/domain/todo/port/usecase/GetToDoListPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsNumber } from 'class-validator';

@Exclude()
export class GetToDoListAdapter
  extends UseCaseValidatableAdapter
  implements GetToDoListPort
{
  @Expose()
  @IsUUID()
  public executorId: string;

  @Expose()
  @IsNumber()
  public page: number;

  @Expose()
  @IsNumber()
  public limit: number;

  public static async new(payload: GetToDoListPort): Promise<GetToDoListAdapter> {
    const adapter: GetToDoListAdapter = plainToClass(GetToDoListAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
