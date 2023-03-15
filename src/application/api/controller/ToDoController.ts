import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
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
  UseGuards,
} from '@nestjs/common';

import { HttpUser } from '@application/api/auth/decorator/HttpUser';
import { JwtAuthGuard } from '@application/api/auth/guard/JwtAuthGuard';
import { CreateToDo } from '@application/api/controller/documentation/todo/CreateToDo';
import { ResponseToDo } from '@application/api/controller/documentation/todo/ResponseToDo';
import { UserPayload } from '@application/api/auth/type/AuthTypes';
import { EditToDoBody } from '@application/api/controller/documentation/todo/EditToDoBody';
import { ResponseToDoList } from '@application/api/controller/documentation/todo/ResonseToDoList';
import { GetToDoListQuery } from '@application/api/controller/documentation/todo/GetToDoListQuery';
import { ApiKeyAuthGuard } from '@application/api/auth/guard/ApiKeyAuthGuard';

import { CreateToDoAdapter } from '@infrastructure/adapter/usecase/todo/CreateToDoAdapter';
import { GetToDoAdapter } from '@infrastructure/adapter/usecase/todo/GetToDoAdapter';
import { EditToDoAdapter } from '@infrastructure/adapter/usecase/todo/EditToDoAdapter';
import { RemoveToDoAdapter } from '@infrastructure/adapter/usecase/todo/RemoveToDoAdapter';
import { GetToDoListAdapter } from '@infrastructure/adapter/usecase/todo/GetToDoListAdapter';

import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { ToDoDITokens } from '@core/domain/todo/di/ToDoDITokens';
import { CreateToDoUseCase } from '@core/domain/todo/usecase/CreateToDoUseCase';
import { ToDoUseCaseDto } from '@core/domain/todo/usecase/dto/ToDoUseCaseDto';
import { GetToDoUseCase } from '@core/domain/todo/usecase/GetToDoUseCase';
import { EditToDoPort } from '@core/domain/todo/port/usecase/EditToDoPort';
import { EditToDoUseCase } from '@core/domain/todo/usecase/EditToDoUseCase';
import { RemoveToDoUseCase } from '@core/domain/todo/usecase/RemoveToDoUseCase';
import { GetToDoListUseCase } from '@core/domain/todo/usecase/GetToDoListUseCase';
import { ToDoListPaginationDto } from '../../../core/domain/todo/usecase/dto/ToDoListPaginationDto';
@UseGuards(JwtAuthGuard)
@UseGuards(ApiKeyAuthGuard)
@Controller('todos')
@ApiTags('todos')
export class ToDoController {
  constructor(
    @Inject(ToDoDITokens.CreateToDoUseCase)
    private readonly createToDoUseCase: CreateToDoUseCase,

    @Inject(ToDoDITokens.GetToDoUseCase)
    private readonly getToDoUseCase: GetToDoUseCase,

    @Inject(ToDoDITokens.EditToDoUseCase)
    private readonly editToDoUseCase: EditToDoUseCase,
    // todo
    @Inject(ToDoDITokens.RemoveToDoUseCase)
    private readonly removeToDoUseCase: RemoveToDoUseCase,

    @Inject(ToDoDITokens.GetToDoListUseCase)
    private readonly getToDoListUseCase: GetToDoListUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: CreateToDo })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToDo })
  public async createToDo(
    @HttpUser() user: UserPayload,
    @Body() body: CreateToDo
  ): Promise<CoreApiResponse<ToDoUseCaseDto>> {
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
    return CoreApiResponse.success(createdToDo);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', type: 'number', required: true })
  @ApiQuery({ name: 'page', type: 'number', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToDoList })
  public async getToDoList(
    @HttpUser() user: UserPayload,
    @Query() query: GetToDoListQuery
  ): Promise<CoreApiResponse<ToDoListPaginationDto>> {
    const adapter: GetToDoListAdapter = await GetToDoListAdapter.new({
      executorId: user.id,
      page: Number(query.page),
      limit: Number(query.limit),
    });
    const todos: ToDoListPaginationDto = await this.getToDoListUseCase.execute(
      adapter
    );

    return CoreApiResponse.success(todos);
  }

  @Get(':toDoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: ResponseToDo })
  public async getToDo(
    @HttpUser() user: UserPayload,
    @Param('toDoId') toDoId: string,
  ): Promise<CoreApiResponse<ToDoUseCaseDto>> {
    const adapter: GetToDoAdapter = await GetToDoAdapter.new({
      executorId: user.id,
      toDoId: toDoId,
    });
    const toDo: ToDoUseCaseDto = await this.getToDoUseCase.execute(adapter);
    return CoreApiResponse.success(toDo);
  }

  @Put(':toDoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: EditToDoBody })
  @ApiResponse({ status: HttpStatus.OK, type: EditToDoBody })
  public async editToDo(
    @HttpUser() user: UserPayload,
    @Body() body: EditToDoBody,
    @Param('toDoId') toDoId: string
  ): Promise<CoreApiResponse<ToDoUseCaseDto>> {
    const data: EditToDoPort = (({
      title,
      description,
      startTime,
      endTime,
      status,
      priority,
    }: EditToDoBody) => ({
      executorId: user.id,
      toDoId,
      title,
      description,
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      status,
      priority,
    }))(body);
    const adapter: EditToDoAdapter = await EditToDoAdapter.new(data);

    const editedToDo: ToDoUseCaseDto = await this.editToDoUseCase.execute(
      adapter
    );
    return CoreApiResponse.success(editedToDo);
  }

  @Delete(':toDoId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK })
  public async removeToDo(
    @HttpUser() user: UserPayload,
    @Param('toDoId') toDoId: string
  ): Promise<CoreApiResponse<void>> {
    const adapter: RemoveToDoAdapter = await RemoveToDoAdapter.new({
      executorId: user.id,
      toDoId,
    });
    await this.removeToDoUseCase.execute(adapter);
    return CoreApiResponse.success();
  }
}
