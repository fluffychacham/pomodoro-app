import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDto } from "src/user/user.dto";

export const JwtAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDto;
  }
);
