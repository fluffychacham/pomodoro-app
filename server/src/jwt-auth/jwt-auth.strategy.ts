import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { JWTPayload } from "./jwt-payload.interface";

config();

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies[process.env.COOKIE_NAME];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ sub, exp, iat }: JWTPayload, done: Function) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
