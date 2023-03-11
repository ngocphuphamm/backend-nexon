import { ApiResponse } from '@application/api/controller/documentation/common/HttpRestApiResponse';
import { ModelUser } from '@application/api/controller/documentation/user/ModelUser';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUser extends ApiResponse {
  @ApiProperty({type: ModelUser})
  public data: ModelUser;
}
