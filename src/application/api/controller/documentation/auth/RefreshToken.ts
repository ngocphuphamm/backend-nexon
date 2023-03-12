import { ApiProperty } from '@nestjs/swagger';
export class RefreshTokenBody {
  @ApiProperty({ type: 'string' })
  public refreshToken: string;
}
