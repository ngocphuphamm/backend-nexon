import { ApiProperty } from '@nestjs/swagger';
export class LoginBody {
  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ type: 'string' })
  public password: string;
}
