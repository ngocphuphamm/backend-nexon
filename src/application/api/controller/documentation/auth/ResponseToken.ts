import { ApiResponse } from '@application/api/controller/documentation/common/HttpRestApiResponse';
import { ApiProperty } from '@nestjs/swagger';
import { ModelToken } from '@application/api/controller/documentation/auth/ModelToken';
export class ResponseToken extends ApiResponse {
  @ApiProperty({type: ModelToken})
  public data: ModelToken;
}
