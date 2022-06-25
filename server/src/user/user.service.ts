import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCredentialService } from "src/user-credentials/user-credentials.service";
import { DefaultUserPomodoro } from "src/user-pomodoro/user-pomodoro.config";
import { UserPomodoroDto } from "src/user-pomodoro/user-pomodoro.dto";
import { UserPomodoroType } from "src/user-pomodoro/user-pomodoro.enum";
import { UserPomodoroService } from "src/user-pomodoro/user-pomodoro.service";
import { Repository } from "typeorm";
import {
  CreateUserDto,
  UserDto,
  UserLoginDto,
  UserPreferencesDto,
  userPreferencesToDto,
  userToDto,
} from "./user.dto";
import { User, UserPreferences } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRepository: Repository<UserPreferences>,
    private readonly userCredentialService: UserCredentialService,
    private readonly userPomodoroService: UserPomodoroService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.userRepository.save({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userPomodoro: new DefaultUserPomodoro(),
    });

    await this.userCredentialService.create(createdUser.id, user.password);
    await this.createUserPreferences(createdUser.id);
    return userToDto(createdUser);
  }

  async findByUsername(username: string): Promise<UserDto | HttpException> {
    const existingUser = await this.userRepository.findOne({
      relations: ["userPomodoro"],
      where: { username },
    });
    if (!existingUser) throw new NotFoundException();

    if (existingUser.userPomodoro == null) {
      const userPomodoro = await this.userPomodoroService.create(existingUser);
      if (userPomodoro instanceof UserPomodoroDto) {
        await this.userRepository.update(existingUser.id, {
          userPomodoro,
        });
      }
    }

    return userToDto(existingUser);
  }

  async findById(id: number): Promise<UserDto | HttpException> {
    const existingUser = await this.userRepository.findOne({
      relations: ["userPomodoro"],
      where: { id },
    });
    if (!existingUser) throw new NotFoundException();
    return userToDto(existingUser);
  }

  async createUserPreferences(userId: number): Promise<UserPreferences> {
    return await this.userPreferencesRepository.save({ userId });
  }

  async findPreferencesByUserId(userId: number): Promise<UserPreferencesDto> {
    let preferences = await this.userPreferencesRepository.findOne({
      userId,
    });
    if (!preferences) preferences = await this.createUserPreferences(userId);
    return userPreferencesToDto(preferences);
  }

  async updatePreferences(
    userId: number,
    preferences: UserPreferencesDto
  ): Promise<UserPreferencesDto | HttpException> {
    const existingUser = await this.findPreferencesByUserId(userId);
    if (existingUser instanceof UserPreferencesDto) {
      return userPreferencesToDto(
        await this.userPreferencesRepository.save(preferences)
      );
    }
    return new NotFoundException();
  }

  async update(id: number, user: UserDto): Promise<UserDto | HttpException> {
    await this.userRepository.update(id, { ...user });
    const existingUser = await this.userRepository.findOne({
      relations: ["userPomodoro"],
      where: { id },
    });
    if (!existingUser) throw new NotFoundException();
    return userToDto(existingUser);
  }

  async delete(id: number): Promise<any> {
    await this.userRepository.delete(id);
  }

  async isUserValid(user: UserLoginDto): Promise<boolean | HttpException> {
    const existingUser = await this.findByUsername(user.username);
    if (existingUser instanceof UserDto) {
      return await this.userCredentialService.isPasswordValid(
        existingUser.id,
        user.password
      );
    }
    return new NotFoundException();
  }
}
