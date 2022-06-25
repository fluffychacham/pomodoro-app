import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { UserPomodoroDto, userPomodoroToDto } from "./user-pomodoro.dto";
import { UserPomodoro } from "./user-pomodoro.entity";
import { UserPomodoroType } from "./user-pomodoro.enum";

@Injectable()
export class UserPomodoroService {
  constructor(
    @InjectRepository(UserPomodoro)
    private readonly userPomodoroRepository: Repository<UserPomodoro>
  ) {}

  async create(user: User): Promise<UserPomodoroDto | HttpException> {
    const created = await this.userPomodoroRepository.save({
      pomodoroDuration: 25 * 60000, // 25 minutes
      shortBreakDuration: 5 * 60000, // 5 minutes
      longBreakDuration: 15 * 60000, // 15 minutes
      pomodoroType: UserPomodoroType.POMODORO,
      taskLists: [],
      user,
    });

    return userPomodoroToDto(created);
  }

  async update(
    userPomodoroDto: UserPomodoroDto
  ): Promise<UserPomodoroDto | HttpException> {
    const existing = await this.userPomodoroRepository.findOne({
      id: userPomodoroDto.id,
    });

    if (existing == null) throw new NotFoundException();

    await this.userPomodoroRepository.update(
      { id: userPomodoroDto.id },
      {
        pomodoroDuration: userPomodoroDto.pomodoroDuration,
        shortBreakDuration: userPomodoroDto.shortBreakDuration,
        longBreakDuration: userPomodoroDto.longBreakDuration,
        pomodoroType: userPomodoroDto.pomodoroType,
      }
    );

    return userPomodoroDto;
  }

  async delete(id: number): Promise<void | HttpException> {
    const existing = await this.userPomodoroRepository.findOne({
      id,
    });

    if (existing == null) throw new NotFoundException();

    await this.userPomodoroRepository.delete({ id });
  }
}
