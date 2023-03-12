import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogout {
  @ApiProperty({ type: 'string' })
  public description: string;
}
