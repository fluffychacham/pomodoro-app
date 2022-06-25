import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuth } from "src/jwt-auth/jwt-auth.decorator";
import { JwtAuthGuard } from "src/jwt-auth/jwt-auth.guard";
import { UserDto } from "src/user/user.dto";
import { CreateTasklistDto, TaskListDto } from "./tasklist.dto";
import { TaskListService } from "./tasklist.service";

@Controller("api/tasklist")
export class TasklistController {
  constructor(private readonly tasklistService: TaskListService) {}

  @Post("new")
  @UseGuards(JwtAuthGuard)
  async createTasklist(
    @JwtAuth() user: UserDto,
    @Body() createTasklistDto: CreateTasklistDto
  ): Promise<TaskListDto> {
    const userId = user.id;
    return await this.tasklistService.create(userId, createTasklistDto);
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  async getAll(@JwtAuth() user: UserDto): Promise<TaskListDto[]> {
    const userId = user.id;
    return await this.tasklistService.findAllByUserId(userId);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getTasklist(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<TaskListDto | HttpException> {
    const userId = user.id;
    const id = Number(idStr);
    return await this.tasklistService.findById(userId, id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateTasklist(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string,
    @Body() taskListDto: TaskListDto
  ): Promise<TaskListDto | HttpException> {
    const userId = user.id;
    const id = Number(idStr);
    return await this.tasklistService.update(userId, {
      id,
      ...taskListDto,
    });
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteTasklist(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<void | HttpException> {
    const userId = user.id;
    const id = Number(idStr);
    return await this.tasklistService.delete(userId, id);
  }
}
