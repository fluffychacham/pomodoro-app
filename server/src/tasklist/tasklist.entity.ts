import { Pomodoro } from "src/pomodoro/pomodoro.entity";
import { UserPomodoro } from "src/user-pomodoro/user-pomodoro.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  task: string;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Pomodoro, (pomodoro) => pomodoro.taskList, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  pomodoro: Pomodoro;

  @ManyToOne(() => UserPomodoro, (userPomodoro) => userPomodoro.taskLists)
  userPomodoro: UserPomodoro;
}
