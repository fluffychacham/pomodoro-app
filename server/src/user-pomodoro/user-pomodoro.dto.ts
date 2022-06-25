import { TaskListDto, taskListToDto } from "src/tasklist/tasklist.dto";
import { User } from "src/user/user.entity";
import { UserPomodoro } from "./user-pomodoro.entity";
import { UserPomodoroType } from "./user-pomodoro.enum";

export class UserPomodoroDto {
  id: number;

  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodoroType: UserPomodoroType;

  taskLists: TaskListDto[];
}

export class CreateUserPomodoroDto {
  pomodoroDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  pomodoroType?: UserPomodoroType;

  taskLists: TaskListDto[];
}

export const userPomodoroToDto = (userPomodoro?: UserPomodoro) => {
  const userPomodoroDto = new UserPomodoroDto();
  userPomodoroDto.id = userPomodoro?.id;
  userPomodoroDto.pomodoroDuration = userPomodoro?.pomodoroDuration;
  userPomodoroDto.shortBreakDuration = userPomodoro?.shortBreakDuration;
  userPomodoroDto.longBreakDuration = userPomodoro?.longBreakDuration;
  userPomodoroDto.pomodoroType = userPomodoro?.pomodoroType;
  userPomodoroDto.taskLists = userPomodoro?.taskLists?.map((taskList) =>
    taskListToDto(taskList)
  );

  return userPomodoroDto;
};
