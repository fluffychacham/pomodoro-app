import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  userId: number;

  @Column({ nullable: false })
  hash: string;
}
