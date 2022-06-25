import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PomodoroModule } from "src/pomodoro/pomodoro.module";
import { TasklistController } from "./tasklist.controller";
import { TaskList } from "./tasklist.entity";
import { TaskListService } from "./tasklist.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskList]), PomodoroModule],
  controllers: [TasklistController],
  providers: [TaskListService],
})
export class TaskListModule {}
