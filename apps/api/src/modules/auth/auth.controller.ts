import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RateLimitLogin, RateLimitRegister } from "../../common/decorators/rate-limit.decorator";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import type { AuthResponse } from "./interfaces/auth-response.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
