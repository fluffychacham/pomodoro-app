import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  createDtoToPomodoro,
  CreatePomodoroDto,
  PomodoroDto,
  pomodoroToDto,
} from "./pomodoro.dto";
import { Pomodoro } from "./pomodoro.entity";

@Injectable()
export class PomodoroService {
  constructor(
    @InjectRepository(Pomodoro)
    private readonly pomodoroRepository: Repository<Pomodoro>
  ) {}

  async findById(
    userId: number,
    id: number
  ): Promise<PomodoroDto | HttpException> {
    const existing = await this.pomodoroRepository.findOne(id);
    if (existing === undefined) throw new NotFoundException();
    if (existing.userId !== userId) throw new UnauthorizedException();

    return pomodoroToDto(existing);
  }

  async create(
    userId: number,
    pomodoroDto: CreatePomodoroDto
  ): Promise<PomodoroDto> {
    const created = await this.pomodoroRepository.save({
      ...createDtoToPomodoro(pomodoroDto),
      userId,
    });
    return pomodoroToDto(created);
  }

  async update(
    userId: number,
    pomodoroDto: PomodoroDto
  ): Promise<PomodoroDto | HttpException> {
    const existing = await this.pomodoroRepository.findOne(pomodoroDto.id);
    if (existing === undefined) throw new NotFoundException();
    if (existing.userId !== userId) throw new UnauthorizedException();

    await this.pomodoroRepository.update({ id: pomodoroDto.id }, pomodoroDto);
    return pomodoroDto;
  }

  async delete(userId: number, id: number): Promise<void | HttpException> {
    const existing = await this.pomodoroRepository.findOne(id);
    if (existing === undefined) throw new NotFoundException();
    if (existing.userId !== userId) throw new UnauthorizedException();

    await this.pomodoroRepository.delete(id);
  }
}
