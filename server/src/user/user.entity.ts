import { UserPomodoro } from "src/user-pomodoro/user-pomodoro.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName?: string | null;

  @Column({ nullable: true })
  lastName?: string | null;

  @Column({ nullable: true })
  email?: string | null;

  @OneToOne(() => UserPomodoro, (userPomodoro) => userPomodoro.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  userPomodoro: UserPomodoro;
}

@Entity()
export class UserPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: 25 })
  pomodoroDuration: number;

  @Column({ default: 5 })
  pomodoroBreakDuration: number;

  @Column({ default: 15 })
  pomodoroLongBreakDuration: number;
}
