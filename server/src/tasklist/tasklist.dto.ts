import {
  CreatePomodoroDto,
  PomodoroDto,
  pomodoroToDto,
} from "src/pomodoro/pomodoro.dto";
import {
  UserPomodoroDto,
  userPomodoroToDto,
} from "src/user-pomodoro/user-pomodoro.dto";
import { TaskList } from "./tasklist.entity";

export class TaskListDto {
  id: number;
  userId: number;
  task: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  pomodoro: PomodoroDto;
  userPomodoro: UserPomodoroDto;
}

export const taskListToDto = (taskList?: TaskList): TaskListDto => {
  console.log(taskList?.pomodoro);
  const taskListDto = new TaskListDto();
  taskListDto.id = taskList?.id;
  taskListDto.userId = taskList?.userId;
  taskListDto.task = taskList?.task;
  taskListDto.done = taskList?.done;
  taskListDto.createdAt = taskList?.createdAt;
  taskListDto.updatedAt = taskList?.updatedAt;
  taskListDto.pomodoro = pomodoroToDto(taskList?.pomodoro);
  taskListDto.userPomodoro = userPomodoroToDto(taskList?.userPomodoro);

  return taskListDto;
};

export class CreateTasklistDto {
  userId: number;
  task: string;
  pomodoro: CreatePomodoroDto;
}
