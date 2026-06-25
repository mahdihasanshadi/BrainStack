import { Module } from "@nestjs/common";
import { RolesGuard } from "../../common/guards";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { AdminUsersController } from "./admin-users.controller";
import { AdminUsersService } from "./admin-users.service";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, RolesGuard],
})
export class AdminModule {}
