import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { config } from "dotenv";
import { Response } from "express";
import { JwtAuth } from "src/jwt-auth/jwt-auth.decorator";
import { JwtAuthGuard } from "src/jwt-auth/jwt-auth.guard";
import { JwtAuthService } from "src/jwt-auth/jwt-auth.service";
import { cookieConfig } from "./user.config";
import {
  CreateUserDto,
  UserDto,
  UserLoginDto,
  UserPreferencesDto,
} from "./user.dto";
import { UserService } from "./user.service";

config();

@Controller("api/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  // User login
  @Post("login")
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() user: UserLoginDto
  ): Promise<UserDto | HttpException> {
    response.cookie(
      process.env.COOKIE_NAME,
      await this.jwtAuthService.login(user),
      cookieConfig
    );
    return await this.userService.findByUsername(user.username);
  }

  // User logout
  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie(process.env.COOKIE_NAME, cookieConfig);
  }

  // Get authed user
  @Get("self")
  @UseGuards(JwtAuthGuard)
  async getAuthedUser(
    @JwtAuth() user: UserDto
  ): Promise<UserDto | HttpException> {
    return await this.userService.findByUsername(user.username);
  }

  // Get user by ID
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findById(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<any> {
    const id = Number(idStr);
    if (user.id !== id) throw new UnauthorizedException();
    return await this.userService.findById(id);
  }

  // Create new user
  @Post("new")
  async create(@Body() userDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(userDto);
  }

  // Get user preferences
  @Get(":id/preferences")
  @UseGuards(JwtAuthGuard)
  async getAuthedPreferences(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<UserPreferencesDto | HttpException> {
    const id = Number(idStr);
    if (user.id !== id) throw new UnauthorizedException();
    return await this.userService.findPreferencesByUserId(id);
  }

  // Update user preferences
  @Put(":id/preferences")
  @UseGuards(JwtAuthGuard)
  async updatePreferences(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string,
    @Body() preferences: UserPreferencesDto
  ): Promise<UserPreferencesDto | HttpException> {
    const id = Number(idStr);
    if (user.id !== id) throw new UnauthorizedException();
    return await this.userService.updatePreferences(id, preferences);
  }

  // Update user profile
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string,
    @Body() userDto: UserDto
  ): Promise<UserDto | HttpException> {
    const id = Number(idStr);
    if (user.id !== id) throw new UnauthorizedException();
    return await this.userService.update(id, userDto);
  }

  // Delete user
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(
    @JwtAuth() user: UserDto,
    @Param("id") idStr: string
  ): Promise<void | HttpException> {
    const id = Number(idStr);
    if (user.id !== id) throw new UnauthorizedException();
    return await this.userService.delete(id);
  }
}
