import { IUserPomodoro } from "./UserPomodoro";

export interface IUser {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userPomodoro?: IUserPomodoro;
}
