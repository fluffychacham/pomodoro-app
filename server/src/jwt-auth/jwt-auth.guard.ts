import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Observable } from "rxjs";
import { UserDto } from "src/user/user.dto";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = UserDto>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
