import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserLoginDto } from "src/user/user.dto";
import { LocalAuthService } from "./local-auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: LocalAuthService) {
    super();
  }

  async validate(user: UserLoginDto): Promise<any> {
    const isUserValid = await this.authService.validateUser(user);
    if (!isUserValid) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
