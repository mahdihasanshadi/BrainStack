import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request, NotFoundException } from "@nestjs/common";
import { RateLimitLogin, RateLimitRegister } from "../../common/decorators/rate-limit.decorator";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtAuthGuard } from "../../common/guards";
import type { AuthResponse, SafeUser } from "./interfaces/auth-response.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @RateLimitRegister()
  register(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.register(registerUserDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @RateLimitLogin()
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    return this.authService.refresh(refreshTokenDto.refreshToken);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any): Promise<SafeUser> {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.usersService.toSafeUser(user);
  }
}
