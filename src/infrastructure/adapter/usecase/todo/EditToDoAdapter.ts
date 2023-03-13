import { UseCaseValidatableAdapter } from '@core/common/adapter/usecase/UseCaseValidatableAdapter';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString, IsUUID, IsDate } from 'class-validator';
import { ToDoStatus, ToDoPriority } from '@core/common/enums/ToDoEnums';
import { EditToDoPort } from '@core/domain/todo/port/usecase/EditToDoPort';

@Exclude()
export class EditToDoAdapter extends UseCaseValidatableAdapter implements EditToDoPort {
  
  @Expose()
  @IsUUID()
  public executorId: string;
  
  @Expose()
  @IsUUID()
  public toDoId: string;
  
  @Expose()
  @IsOptional()
  @IsString()
  public title?: string;
  
  @Expose()
  @IsOptional()
  @IsDate()
  public startTime?: Date;

    
  @Expose()
  @IsOptional()
  @IsDate()
  public endTime?: Date;

  @Expose()
  @IsOptional()
  @IsString()
  public status?: ToDoStatus;


  @Expose()
  @IsOptional()
  @IsString()
  public priority?: ToDoPriority;
  
  @Expose()
  @IsOptional()
  @IsString()
  public description?: string;
  
  public static async new(payload: EditToDoPort): Promise<EditToDoAdapter> {
    const adapter: EditToDoAdapter = plainToClass(EditToDoAdapter, payload);
    await adapter.validate();
    
    return adapter;
  }
  
}
