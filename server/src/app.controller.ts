import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { config } from "dotenv";
import { Response } from "express";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./jwt-auth/jwt-auth.guard";
import { JwtAuthService } from "./jwt-auth/jwt-auth.service";
import { UserLoginDto } from "./user/user.dto";

config();

@Controller("api")
export class AppController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
