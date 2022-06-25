import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtAuth } from "src/jwt-auth/jwt-auth.decorator";
import { JwtAuthGuard } from "src/jwt-auth/jwt-auth.guard";
import { UserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import { UserPomodoroDto } from "./user-pomodoro.dto";
import { UserPomodoroService } from "./user-pomodoro.service";

@Controller("api/user-pomodoro")
export class UserPomodoroController {
  constructor(private readonly userPomodoroService: UserPomodoroService) {}

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  async update(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string,
    @Body() userPomodoroDto: UserPomodoroDto
  ): Promise<UserPomodoroDto | HttpException> {
    const id = Number(idStr);
    const userPomodoroId = user.userPomodoro?.id;
    if (userPomodoroId !== id) throw new UnauthorizedException();

    return await this.userPomodoroService.update({
      ...userPomodoroDto,
      id,
    });
  }

  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  async delete(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<void | HttpException> {
    const id = Number(idStr);
    const userPomodoroId = user.userPomodoro?.id;
    if (userPomodoroId !== id) throw new UnauthorizedException();

    return await this.userPomodoroService.delete(id);
  }
}
