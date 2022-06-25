import { UserPomodoro } from "./user-pomodoro.entity";
import { UserPomodoroType } from "./user-pomodoro.enum";

export const defaultUserPomodoro: UserPomodoro = {
  pomodoroDuration: 25 * 60000, // 25 minutes
  shortBreakDuration: 5 * 60000, // 5 minutes
  longBreakDuration: 15 * 60000, // 15 minutes
  pomodoroType: UserPomodoroType.POMODORO,
  taskLists: [],
} as UserPomodoro;

export class DefaultUserPomodoro extends UserPomodoro {
  constructor() {
    super();
    Object.assign(this, defaultUserPomodoro);
  }
}
