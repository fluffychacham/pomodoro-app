import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { config } from "dotenv";
import { UserModule } from "src/user/user.module";
import { JwtAuthService } from "./jwt-auth.service";
import { JwtStrategy } from "./jwt-auth.strategy";

config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1 hour" },
    }),
  ],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
