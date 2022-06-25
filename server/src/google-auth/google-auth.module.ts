import { Module } from "@nestjs/common";
import { GoogleController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { GoogleStrategy } from "./google-auth.strategy";

@Module({
  controllers: [GoogleController],
  providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
