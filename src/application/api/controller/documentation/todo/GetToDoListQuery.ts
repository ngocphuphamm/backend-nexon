import { ApiProperty } from '@nestjs/swagger';

export class GetToDoListQuery {
  @ApiProperty({ type: 'number' })
  public page: number;

  @ApiProperty({ type: 'number' })
  public limit: number;
}
