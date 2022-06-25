import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthModule } from "src/jwt-auth/jwt-auth.module";
import { UserCredentialsModule } from "src/user-credentials/user-credentials.module";
import { UserPomodoroModule } from "src/user-pomodoro/user-pomodoro.module";
import { UserController } from "./user.controller";
import { User, UserPreferences } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserPreferences]),
    UserCredentialsModule,
    UserPomodoroModule,
    forwardRef(() => JwtAuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
