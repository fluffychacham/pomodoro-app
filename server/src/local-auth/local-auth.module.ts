import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { LocalAuthService } from "./local-auth.service";
import { JwtStrategy } from "../jwt-auth/jwt-auth.strategy";
import { LocalStrategy } from "./local-auth.strategy";

@Module({
  imports: [UserModule, PassportModule],
  providers: [LocalAuthService, LocalStrategy],
  exports: [LocalAuthService],
})
export class LocalAuthModule {}
