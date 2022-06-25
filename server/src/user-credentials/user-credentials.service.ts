import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCredentials } from "./user-credentials.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserCredentialService {
  constructor(
    @InjectRepository(UserCredentials)
    private userCredRepository: Repository<UserCredentials>
  ) {}

  async create(userId: number, password: string): Promise<UserCredentials> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return await this.userCredRepository.save({
      userId,
      hash,
    });
  }

  async isPasswordValid(userId: number, password: string): Promise<boolean> {
    const existingUserCred = await this.userCredRepository.findOne({ userId });
    return await bcrypt.compare(password, existingUserCred?.hash);
  }
}
