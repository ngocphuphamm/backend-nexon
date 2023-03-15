import { ApiResponse } from '@application/api/controller/documentation/common/HttpRestApiResponse';
import { ModelToDo } from '@application/api/controller/documentation/todo/ModelToDo';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseToDoList extends ApiResponse {
  @ApiProperty({type: ModelToDo, isArray: true})
  public data: {
    pagination:{
      page : number,
      limit: number,
      sumPage: number
    },
    listToDo: ModelToDo[]
  };
}
