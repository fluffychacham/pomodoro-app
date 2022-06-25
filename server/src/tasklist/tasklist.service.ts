import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { dtoToPomodoro, PomodoroDto } from "src/pomodoro/pomodoro.dto";
import { Pomodoro } from "src/pomodoro/pomodoro.entity";
import { PomodoroService } from "src/pomodoro/pomodoro.service";
import { Repository } from "typeorm";
import { CreateTasklistDto, TaskListDto, taskListToDto } from "./tasklist.dto";
import { TaskList } from "./tasklist.entity";

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    private readonly pomodoroService: PomodoroService
  ) {}

  async findAllByUserId(userId: number): Promise<TaskListDto[]> {
    return (
      await this.taskListRepository.find({
        relations: ["pomodoro"],
        where: { userId },
      })
    ).map((task) => taskListToDto(task));
  }

  async create(
    userId: number,
    createTasklistDto: CreateTasklistDto
  ): Promise<TaskListDto> {
    const { actual, current, estimated } = createTasklistDto.pomodoro;
    const pomodoro = new Pomodoro();
    pomodoro.actual = actual;
    pomodoro.current = current;
    pomodoro.estimated = estimated;
    pomodoro.userId = userId;

    const taskList = new TaskList();
    taskList.userId = userId;
    taskList.task = createTasklistDto.task;
    taskList.done = false;
    taskList.pomodoro = pomodoro;

    const createdTaskList = await this.taskListRepository.save(taskList);
    return taskListToDto(createdTaskList);
  }

  async findById(
    userId: number,
    id: number
  ): Promise<TaskListDto | HttpException> {
    const existingTaskList = await this.taskListRepository.findOne({
      relations: ["pomodoro"],
      where: { id },
    });
    if (existingTaskList === undefined) throw new NotFoundException();
    if (existingTaskList.userId !== userId) throw new UnauthorizedException();

    return taskListToDto(existingTaskList);
  }

  async update(
    userId: number,
    taskListDto: TaskListDto
  ): Promise<TaskListDto | HttpException> {
    const existingTaskList = await this.taskListRepository.findOne({
      relations: ["pomodoro"],
      where: { id: taskListDto.id },
    });
    if (existingTaskList === undefined) throw new NotFoundException();
    if (existingTaskList.userId !== userId) throw new UnauthorizedException();

    await this.taskListRepository.update(
      { id: taskListDto.id },
      {
        task: taskListDto.task,
        done: taskListDto.done,
        pomodoro: dtoToPomodoro(taskListDto?.pomodoro),
        userPomodoro: taskListDto?.userPomodoro,
      }
    );

    await this.pomodoroService.update(userId, taskListDto.pomodoro);
    return taskListDto;
  }

  async delete(userId: number, id: number): Promise<void | HttpException> {
    const existingTaskList = await this.taskListRepository.findOne({
      relations: ["pomodoro"],
      where: { id },
    });
    if (existingTaskList === undefined) throw new NotFoundException();
    if (existingTaskList.userId !== userId) throw new UnauthorizedException();

    await this.taskListRepository.delete(id);
    await this.pomodoroService.delete(userId, existingTaskList.pomodoro.id);
  }
}
