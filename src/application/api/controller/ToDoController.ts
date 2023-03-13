import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseException } from '@core/common/exception/ResponseException';

import { HttpUser } from '@application/api/auth/decorator/HttpUser';
import { JwtAuthGuard } from '@application/api/auth/guard/JwtAuthGuard';
import { CreateToDo } from '@application/api/controller/documentation/todo/CreateToDo';
import { ResponseToDo } from '@application/api/controller/documentation/todo/ResponseToDo';
import { UserPayload } from '@application/api/auth/type/AuthTypes';
import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { ToDoDITokens } from '@core/domain/todo/di/ToDoDITokens';
import { CreateToDoUseCase } from '@core/domain/todo/usecase/CreateToDoUseCase';
import { CreateToDoAdapter } from '@infrastructure/adapter/usecase/todo/CreateToDoAdapter';
import { ToDoPriority } from '@core/common/enums/ToDoEnums';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';

@UseGuards(JwtAuthGuard)
@Controller('todos')
@ApiTags('todos')
export class ToDoController {
  constructor(
    @Inject(ToDoDITokens.CreateToDoUseCase)
    private readonly createToDoUseCase: CreateToDoUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: CreateToDo })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToDo })
  public async createPost(
    @HttpUser() user: UserPayload,
    @Body() body: CreateToDo,
    @Res() response: Response
  ): Promise<Response<CoreApiResponse<ToDoUseCaseDto>>> {
    try {
      if (body.startTime > body.endTime) {
        throw Exception.new({
          code: Code.BAD_REQUEST_ERROR,
          overrideMessage: 'startTime < endTime ',
        });
      }
      const adapter: CreateToDoAdapter = await CreateToDoAdapter.new({
        executorId: user.id,
        title: body.title,
        description: body.description,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        status: body.status,
        priority: body.priority,
      });

      const createdToDo: ToDoUseCaseDto = await this.createToDoUseCase.execute(
        adapter
      );
      return response
        .status(Code.SUCCESS.code)
        .json(CoreApiResponse.success(createdToDo));
    } catch (err) {
      return ResponseException(err, response);
    }
  }
}
