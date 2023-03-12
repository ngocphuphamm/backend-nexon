import { ApiResponse } from '@application/api/controller/documentation/common/HttpRestApiResponse';
import { ModelToDo } from '@application/api/controller/documentation/todo/ModelToDo';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseToDo extends ApiResponse {
  @ApiProperty({type: ModelToDo})
  public data: ModelToDo;
}
