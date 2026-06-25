import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserRole } from "../users/entities/user.entity";
import { AdminUsersService } from "./admin-users.service";
import type { AdminCreatedUserResponse } from "./interfaces/admin-created-user-response.interface";

@Controller("admin/users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<AdminCreatedUserResponse> {
    return this.adminUsersService.createUser(createUserDto);
  }
}
