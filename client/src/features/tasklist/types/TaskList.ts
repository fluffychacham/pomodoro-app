import { IPomodoro } from "@/features/pomodoro";
import { IUserPomodoro } from "@/features/user/types";

export interface ITaskList {
  id: number;
  userId: number;
  task: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  pomodoro?: IPomodoro | null;
  userPomodoro?: IUserPomodoro | null;
}
