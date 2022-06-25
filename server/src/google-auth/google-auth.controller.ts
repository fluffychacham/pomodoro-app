import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { GoogleAuthGuard } from "./google-auth.guard";
import { GoogleAuthService } from "./google-auth.service";

@Controller("api/google")
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.googleAuthService.googleLogin(req);
  }
}
