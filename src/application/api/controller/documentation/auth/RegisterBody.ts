import { ApiProperty } from '@nestjs/swagger';

export class RegisterBody {

  @ApiProperty({type: 'string'})
  public username: string;
  
  @ApiProperty({type: 'string'})
  public email: string;

  
  @ApiProperty({type: 'string'})
  public password: string;
}
