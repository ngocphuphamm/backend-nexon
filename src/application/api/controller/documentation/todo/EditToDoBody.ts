import { ToDoPriority, ToDoStatus } from '@core/common/enums/ToDoEnums';
import { ApiProperty } from '@nestjs/swagger';

export class EditToDoBody {
  @ApiProperty({ type: 'string', required: false })
  public title: string;

  @ApiProperty({ type: 'string', required: false })
  public description: string;

  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  public startTime: string;

  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  public endTime: string;

  @ApiProperty({ enum: ToDoStatus, required: false })
  public status: ToDoStatus;

  @ApiProperty({ enum: ToDoPriority, required: false })
  public priority: ToDoPriority;
}
