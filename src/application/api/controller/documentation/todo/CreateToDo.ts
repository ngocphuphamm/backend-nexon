import { ToDoPriority, ToDoStatus } from '@core/common/enums/ToDoEnums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToDo {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public startTime: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public endTime: string;

  @ApiProperty({ enum: ['to do', 'in progress', 'done'] })
  public status: ToDoStatus;

  @ApiProperty({ enum: ['low', 'medium', 'high'] })
  public priority: ToDoPriority;
}
