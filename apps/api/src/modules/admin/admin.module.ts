import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesGuard } from "../../common/guards";
import { KidAssessment } from "../assessments/entities/kid-assessment.entity";
import { AuthModule } from "../auth/auth.module";
import { ParentMeetingLead } from "../parent-meeting-leads/entities/parent-meeting-lead.entity";
import { CoursePurchase } from "../payments/entities/course-purchase.entity";
import { RegistrationLead } from "../registration-leads/entities/registration-lead.entity";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { AdminDashboardController } from "./admin-dashboard.controller";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminUsersController } from "./admin-users.controller";
import { AdminUsersService } from "./admin-users.service";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([
      RegistrationLead,
      ParentMeetingLead,
      User,
      CoursePurchase,
      KidAssessment,
    ]),
  ],
  controllers: [AdminUsersController, AdminDashboardController],
  providers: [AdminUsersService, AdminDashboardService, RolesGuard],
})
export class AdminModule {}
