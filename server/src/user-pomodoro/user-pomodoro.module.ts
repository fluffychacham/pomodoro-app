import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { UserPomodoroController } from "./user-pomodoro.controller";
import { UserPomodoro } from "./user-pomodoro.entity";
import { UserPomodoroService } from "./user-pomodoro.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserPomodoro])],
  controllers: [UserPomodoroController],
  providers: [UserPomodoroService],
  exports: [UserPomodoroService],
})
export class UserPomodoroModule {}
