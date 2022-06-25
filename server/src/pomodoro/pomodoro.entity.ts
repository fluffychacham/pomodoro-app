import { TaskList } from "src/tasklist/tasklist.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PomodoroType } from "./pomodoro.enum";

@Entity()
export class Pomodoro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ default: 0 })
  current: number;

  @Column({ default: 0 })
  estimated: number;

  @Column({ default: 0 })
  actual: number;

  @OneToOne(() => TaskList, (taskList) => taskList.pomodoro)
  taskList: TaskList;
}
