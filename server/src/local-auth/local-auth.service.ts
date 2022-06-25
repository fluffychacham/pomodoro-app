import { Injectable } from "@nestjs/common";
import { UserCredentialService } from "src/user-credentials/user-credentials.service";
import { UserLoginDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalAuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(user: UserLoginDto): Promise<any> {
    const isUserValid = await this.userService.isUserValid(user);
    if (isUserValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
