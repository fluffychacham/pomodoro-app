import { ITaskList } from "@/features";

export interface IUserPomodoro {
  id: number;
  longBreakDuration: number;
  pomodoroDuration: number;
  pomodoroType: number;
  shortBreakDuration: number;
  taskLists: ITaskList[];
}

export const USER_POMODORO = 0;
export const USER_SHORT_BREAK = 1;
export const USER_LONG_BREAK = 2;
export type UserPomodoroType = 0 | 1 | 2;
