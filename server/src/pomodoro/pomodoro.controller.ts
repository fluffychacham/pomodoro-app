import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtAuth } from "src/jwt-auth/jwt-auth.decorator";
import { JwtAuthGuard } from "src/jwt-auth/jwt-auth.guard";
import { UserDto } from "src/user/user.dto";
import { PomodoroDto } from "./pomodoro.dto";
import { PomodoroService } from "./pomodoro.service";

@Controller("api/pomodoro")
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getById(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<PomodoroDto | HttpException> {
    const userId = user.id;
    const id = Number(idStr);
    return await this.pomodoroService.findById(userId, id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @JwtAuth() user: UserDto,
    @Body() pomodoroDto: PomodoroDto
  ): Promise<PomodoroDto | HttpException> {
    const userId = user.id;
    return await this.pomodoroService.update(userId, pomodoroDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(
    @JwtAuth() user: UserDto,
    @Param("id") id: number
  ): Promise<void | HttpException> {
    const userId = user.id;
    return await this.pomodoroService.delete(userId, id);
  }
}
