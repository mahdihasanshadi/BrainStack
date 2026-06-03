import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Configuration } from "../../../config/configuration";
import type { AuthenticatedUser } from "../../../common/interfaces/authenticated-user.interface";
import { UsersService } from "../../users/users.service";
import { ACCESS_TOKEN_TYPE } from "../constants/auth.constants";
import type { AccessTokenPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<Configuration, true>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt.secret", { infer: true }),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
    if (payload.type !== ACCESS_TOKEN_TYPE) {
      throw new UnauthorizedException("Invalid access token");
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException("User no longer exists");
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
