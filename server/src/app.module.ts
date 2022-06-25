import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LocalAuthModule } from "./local-auth/local-auth.module";
import { UserModule } from "./user/user.module";
import { GoogleAuthModule } from "./google-auth/google-auth.module";
import { JwtAuthModule } from "./jwt-auth/jwt-auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "./typeorm/typeorm.module";
import { PomodoroModule } from "./pomodoro/pomodoro.module";
import { TaskListModule } from "./tasklist/tasklist.module";
import { UserPomodoroModule } from "./user-pomodoro/user-pomodoro.module";

@Module({
  imports: [
    LocalAuthModule,
    UserModule,
    PomodoroModule,
    TaskListModule,
    GoogleAuthModule,
    JwtAuthModule,
    TypeOrmModule,
    UserPomodoroModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
