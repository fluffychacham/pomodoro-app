import { TaskList } from "src/tasklist/tasklist.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserPomodoroType } from "./user-pomodoro.enum";

@Entity()
export class UserPomodoro {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userPomodoro)
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 25 * 60000 }) // 25 minutes
  pomodoroDuration: number; // in milliseconds

  @Column({ default: 5 * 60000 }) // 5 minutes
  shortBreakDuration: number; // in milliseconds

  @Column({ default: 15 * 60000 }) // 15 minutes
  longBreakDuration: number; // in milliseconds

  @Column({
    type: "enum",
    enum: UserPomodoroType,
    default: UserPomodoroType.POMODORO,
  })
  pomodoroType: UserPomodoroType;

  @OneToMany(() => TaskList, (taskList) => taskList.userPomodoro, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  taskLists: TaskList[];
}
