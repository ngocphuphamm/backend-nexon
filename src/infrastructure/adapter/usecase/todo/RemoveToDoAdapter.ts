import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { RemoveToDoPort } from '@core/domain/todo/port/usecase/RemoveToDoPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class RemoveToDoAdapter extends UseCaseValidatableAdapter implements RemoveToDoPort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  @Expose()
  @IsUUID()
  public toDoId: string;
  
  public static async new(payload: RemoveToDoPort): Promise<RemoveToDoAdapter> {
    const adapter: RemoveToDoAdapter = plainToClass(RemoveToDoAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
