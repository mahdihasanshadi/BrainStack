import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import type { AdminCreatedUserResponse } from "./interfaces/admin-created-user-response.interface";

@Injectable()
export class AdminUsersService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto): Promise<AdminCreatedUserResponse> {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.toSafeUser(user);
  }
}
