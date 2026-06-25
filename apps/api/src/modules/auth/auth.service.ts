import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { randomUUID, timingSafeEqual } from "crypto";
import { CacheService } from "../../common/cache/cache.service";
import type { Configuration } from "../../config/configuration";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import {
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_CACHE_PREFIX,
  REFRESH_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TYPE,
} from "./constants/auth.constants";
import { LoginDto } from "./dto/login.dto";
import type { AuthResponse, SafeUser } from "./interfaces/auth-response.interface";
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    const user = await this.usersService.register(registerUserDto);
    return this.issueAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueAuthResponse(user);
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.configService.get("jwt.secret", { infer: true }),
        },
      );
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    if (payload.type !== REFRESH_TOKEN_TYPE || !payload.sub) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const cacheKey = this.getRefreshTokenCacheKey(payload.sub);
    const storedRefreshToken =
      await this.cacheService.get<string>(cacheKey);

    if (
      !storedRefreshToken ||
      !this.tokensMatch(storedRefreshToken, refreshToken)
    ) {
      throw new UnauthorizedException("Refresh token has been revoked");
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      await this.cacheService.del(cacheKey);
      throw new UnauthorizedException("User no longer exists");
    }

    return this.issueAuthResponse(user);
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    await this.cacheService.del(this.getRefreshTokenCacheKey(userId));
  }

  private async issueAuthResponse(user: User): Promise<AuthResponse> {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user.id);

    await this.persistRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: this.toSafeUser(user),
    };
  }

  private async createAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: ACCESS_TOKEN_TYPE,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get("jwt.secret", { infer: true }),
      expiresIn: this.configService.get("jwt.expiry", { infer: true }),
    });
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const payload: RefreshTokenPayload = {
      sub: userId,
      type: REFRESH_TOKEN_TYPE,
      jti: randomUUID(),
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get("jwt.secret", { infer: true }),
      expiresIn: REFRESH_TOKEN_TTL_SECONDS,
    });
  }

  private async persistRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const cacheKey = this.getRefreshTokenCacheKey(userId);

    await this.cacheService.set(
      cacheKey,
      refreshToken,
      REFRESH_TOKEN_TTL_SECONDS,
    );

    const stored = await this.cacheService.get<string>(cacheKey);

    if (!stored || !this.tokensMatch(stored, refreshToken)) {
      this.logger.error(
        `Failed to persist refresh token for user "${userId}" in Redis`,
      );
      throw new InternalServerErrorException("Unable to establish session");
    }
  }

  private getRefreshTokenCacheKey(userId: string): string {
    return `${REFRESH_TOKEN_CACHE_PREFIX}${userId}`;
  }

  private tokensMatch(expected: string, provided: string): boolean {
    if (expected.length !== provided.length) {
      return false;
    }

    return timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(provided, "utf8"),
    );
  }

  private toSafeUser(user: User): SafeUser {
    return this.usersService.toSafeUser(user);
  }
}
