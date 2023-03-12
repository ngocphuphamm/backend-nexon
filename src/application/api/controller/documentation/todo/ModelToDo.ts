import { ApiProperty } from '@nestjs/swagger';

export class ModelToDo {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string' })
  public startTime: string;

  @ApiProperty({ type: 'string' })
  public endTime: string;

  @ApiProperty({ enum: ['to do', 'in progress', 'done'] })
  public status: 'to do' | 'in progress' | 'done';

  @ApiProperty({ enum: ['low', 'medium', 'high'] })
  public priority: 'low' | 'medium' | 'high';

  @ApiProperty({ type: 'string' })
  public userId: string;

  @ApiProperty({type: 'string'})
  public createdAt: string;


  @ApiProperty({type: 'string'})
  public updatedAt: string;
}
