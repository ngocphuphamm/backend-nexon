import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse {
  
  @ApiProperty({type: 'number'})
  public code: number;
  
  @ApiProperty({ type: 'string' })
  public message: string;
  
  @ApiProperty({ description: 'timestamp in ms', type: 'number' })
  public timestamp: number;
  
  @ApiProperty({ type: 'object' })
  public data: unknown;

}
