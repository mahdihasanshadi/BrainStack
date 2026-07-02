import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { UserRole } from "../users/entities/user.entity";
import { AdminDashboardService } from "./admin-dashboard.service";
import type {
  AdminKidAssessmentItem,
  AdminParentMeetingLeadItem,
  AdminPurchaseItem,
  AdminRegistrationLeadItem,
  AdminStatsResponse,
  AdminUserItem,
} from "./interfaces/admin-dashboard.interface";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get("stats")
  getStats(): Promise<AdminStatsResponse> {
    return this.adminDashboardService.getStats();
  }

  @Get("registration-leads")
  listRegistrationLeads(): Promise<AdminRegistrationLeadItem[]> {
    return this.adminDashboardService.listRegistrationLeads();
  }

  @Get("parent-meeting-leads")
  listParentMeetingLeads(): Promise<AdminParentMeetingLeadItem[]> {
    return this.adminDashboardService.listParentMeetingLeads();
  }

  @Get("users")
  listUsers(@Query("role") role?: UserRole): Promise<AdminUserItem[]> {
    return this.adminDashboardService.listUsers(role);
  }

  @Get("purchases")
  listPurchases(): Promise<AdminPurchaseItem[]> {
    return this.adminDashboardService.listPurchases();
  }

  @Get("assessments")
  listAssessments(): Promise<AdminKidAssessmentItem[]> {
    return this.adminDashboardService.listKidAssessments();
  }
}
