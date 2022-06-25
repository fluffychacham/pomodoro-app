import { TaskListDto } from "src/tasklist/tasklist.dto";
import { Pomodoro } from "./pomodoro.entity";
import { PomodoroType } from "./pomodoro.enum";

export class PomodoroDto {
  id: number;
  userId: number;
  current: number;
  estimated: number;
  actual: number;

  taskLists: TaskListDto[];
}

export class CreatePomodoroDto {
  userId: number;
  current: number;
  estimated: number;
  actual: number;
}

export const pomodoroToDto = (pomodoro: Pomodoro): PomodoroDto => {
  const pomodoroDto = new PomodoroDto();
  pomodoroDto.id = pomodoro?.id;
  pomodoroDto.current = pomodoro?.current;
  pomodoroDto.estimated = pomodoro?.estimated;
  pomodoroDto.actual = pomodoro?.actual;

  return pomodoroDto;
};

export const dtoToPomodoro = (pomodoroDto?: PomodoroDto): Pomodoro => {
  const pomodoro = new Pomodoro();
  pomodoro.id = pomodoroDto?.id;
  pomodoro.current = pomodoroDto?.current;
  pomodoro.estimated = pomodoroDto?.estimated;
  pomodoro.actual = pomodoroDto?.actual;

  return pomodoro;
};

export const createDtoToPomodoro = (
  pomodoroDto: CreatePomodoroDto
): Pomodoro => {
  const pomodoro = new Pomodoro();
  pomodoro.userId = pomodoroDto?.userId;
  pomodoro.current = pomodoroDto?.current;
  pomodoro.estimated = pomodoroDto?.estimated;
  pomodoro.actual = pomodoroDto?.actual;

  return pomodoro;
};
