import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { cookieExpiry } from "src/user/user.config";
import { UserDto, UserLoginDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(user: UserLoginDto): Promise<string | HttpException> {
    const existingUser = await this.userService.findByUsername(user.username);
    const isUserValid = await this.userService.isUserValid(user);

    if (existingUser instanceof UserDto && isUserValid) {
      const payload = {
        username: existingUser.username,
        sub: existingUser.id,
      };
      return this.jwtService.sign(payload, { expiresIn: cookieExpiry });
    }
    throw new UnauthorizedException();
  }
}
