import {
  UserPomodoroDto,
  userPomodoroToDto,
} from "src/user-pomodoro/user-pomodoro.dto";
import { User, UserPreferences } from "./user.entity";

export class UserDto {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userPomodoro?: UserPomodoroDto;
}

export const userToDto = (user: User): UserDto => {
  const userDto = new UserDto();
  userDto.id = user?.id;
  userDto.username = user?.username;
  userDto.firstName = user?.firstName;
  userDto.lastName = user?.lastName;
  userDto.email = user?.email;
  userDto.userPomodoro = userPomodoroToDto(user.userPomodoro);
  return userDto;
};

export class UserLoginDto {
  username: string;
  password: string;
}

export class CreateUserDto {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class UserPreferencesDto {
  id: number;
  userId: number;
  pomodoroDuration: number;
  pomodoroBreakDuration: number;
  pomodoroLongBreakDuration: number;
}

export const userPreferencesToDto = (
  preferences: UserPreferences
): UserPreferencesDto => {
  const dto = new UserPreferencesDto();
  dto.id = preferences?.id;
  dto.userId = preferences?.userId;
  dto.pomodoroDuration = preferences?.pomodoroDuration;
  dto.pomodoroBreakDuration = preferences?.pomodoroBreakDuration;
  dto.pomodoroLongBreakDuration = preferences?.pomodoroLongBreakDuration;
  return dto;
};
