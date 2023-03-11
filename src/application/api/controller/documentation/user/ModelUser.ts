import { ApiProperty } from '@nestjs/swagger';

export class ModelUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public username: string;

  @ApiProperty({ type: 'string' })
  public email: string;
}
