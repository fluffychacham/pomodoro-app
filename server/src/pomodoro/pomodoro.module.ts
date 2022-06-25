import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PomodoroController } from "./pomodoro.controller";
import { Pomodoro } from "./pomodoro.entity";
import { PomodoroService } from "./pomodoro.service";

@Module({
  imports: [TypeOrmModule.forFeature([Pomodoro])],
  controllers: [PomodoroController],
  providers: [PomodoroService],
  exports: [PomodoroService],
})
export class PomodoroModule {}
