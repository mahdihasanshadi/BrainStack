import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { KidAssessment } from "../assessments/entities/kid-assessment.entity";
import { ParentMeetingLead } from "../parent-meeting-leads/entities/parent-meeting-lead.entity";
import { CoursePurchase } from "../payments/entities/course-purchase.entity";
import { RegistrationLead } from "../registration-leads/entities/registration-lead.entity";
import { User, UserRole } from "../users/entities/user.entity";
import type {
  AdminKidAssessmentItem,
  AdminParentMeetingLeadItem,
  AdminPurchaseItem,
  AdminRegistrationLeadItem,
  AdminStatsResponse,
  AdminUserItem,
} from "./interfaces/admin-dashboard.interface";

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(RegistrationLead)
    private readonly registrationLeadsRepository: Repository<RegistrationLead>,
    @InjectRepository(ParentMeetingLead)
    private readonly parentMeetingLeadsRepository: Repository<ParentMeetingLead>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CoursePurchase)
    private readonly purchasesRepository: Repository<CoursePurchase>,
    @InjectRepository(KidAssessment)
    private readonly assessmentsRepository: Repository<KidAssessment>,
  ) {}

  async getStats(): Promise<AdminStatsResponse> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      trialRegistrations,
      parentMeetings,
      registeredParents,
      registeredStudents,
      registeredAdmins,
      kidAssessments,
      coursePurchases,
      completedPurchases,
      pendingPurchases,
      trialRegistrationsLast7Days,
      parentMeetingsLast7Days,
      purchasesLast7Days,
    ] = await Promise.all([
      this.registrationLeadsRepository.count(),
      this.parentMeetingLeadsRepository.count(),
      this.usersRepository.count({ where: { role: UserRole.PARENT } }),
      this.usersRepository.count({ where: { role: UserRole.STUDENT } }),
      this.usersRepository.count({ where: { role: UserRole.ADMIN } }),
      this.assessmentsRepository.count(),
      this.purchasesRepository.count(),
      this.purchasesRepository.count({ where: { status: "completed" } }),
      this.purchasesRepository.count({ where: { status: "pending" } }),
      this.registrationLeadsRepository
        .createQueryBuilder("lead")
        .where("lead.createdAt >= :since", { since: sevenDaysAgo })
        .getCount(),
      this.parentMeetingLeadsRepository
        .createQueryBuilder("lead")
        .where("lead.createdAt >= :since", { since: sevenDaysAgo })
        .getCount(),
      this.purchasesRepository
        .createQueryBuilder("purchase")
        .where("purchase.createdAt >= :since", { since: sevenDaysAgo })
        .getCount(),
    ]);

    return {
      totals: {
        trialRegistrations,
        parentMeetings,
        registeredParents,
        registeredStudents,
        registeredAdmins,
        kidAssessments,
        coursePurchases,
        completedPurchases,
        pendingPurchases,
      },
      recent: {
        trialRegistrationsLast7Days,
        parentMeetingsLast7Days,
        purchasesLast7Days,
      },
    };
  }

  async listRegistrationLeads(): Promise<AdminRegistrationLeadItem[]> {
    const leads = await this.registrationLeadsRepository.find({
      relations: { classSlot: true },
      order: { createdAt: "DESC" },
    });

    return leads.map((lead) => ({
      id: lead.id,
      parentName: lead.parentName,
      email: lead.email,
      phone: lead.phone,
      childName: lead.childName,
      childAge: lead.childAge,
      mediumOfInstruction: lead.mediumOfInstruction,
      gender: lead.gender,
      preferredLanguage: lead.preferredLanguage,
      hasDevice: lead.hasDevice,
      notes: lead.notes,
      parentalConsent: lead.parentalConsent,
      consentGivenAt: lead.consentGivenAt,
      createdAt: lead.createdAt,
      classSlot: {
        id: lead.classSlot.id,
        dayOfWeek: lead.classSlot.dayOfWeek,
        startTime: lead.classSlot.startTime,
        endTime: lead.classSlot.endTime,
        minAge: lead.classSlot.minAge,
        maxAge: lead.classSlot.maxAge,
      },
    }));
  }

  async listParentMeetingLeads(): Promise<AdminParentMeetingLeadItem[]> {
    const leads = await this.parentMeetingLeadsRepository.find({
      order: { createdAt: "DESC" },
    });

    return leads.map((lead) => ({
      id: lead.id,
      parentName: lead.parentName,
      email: lead.email,
      phone: lead.phone,
      childName: lead.childName,
      childAge: lead.childAge,
      questions: lead.questions,
      consentGivenAt: lead.consentGivenAt,
      createdAt: lead.createdAt,
    }));
  }

  async listUsers(role?: UserRole): Promise<AdminUserItem[]> {
    const users = await this.usersRepository.find({
      where: role ? { role } : {},
      order: { createdAt: "DESC" },
    });

    return users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt,
    }));
  }

  async listPurchases(): Promise<AdminPurchaseItem[]> {
    const purchases = await this.purchasesRepository.find({
      relations: { course: true },
      order: { createdAt: "DESC" },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      courseId: purchase.courseId,
      courseTitle: purchase.course.title,
      courseSlug: purchase.course.slug,
      email: purchase.email,
      phone: purchase.phone,
      parentName: purchase.parentName,
      amountBdt: purchase.amountBdt,
      originalPriceBdt: purchase.originalPriceBdt,
      status: purchase.status,
      provider: purchase.provider,
      paymentMethod: purchase.paymentMethod,
      createdAt: purchase.createdAt,
      completedAt: purchase.completedAt,
    }));
  }

  async listKidAssessments(): Promise<AdminKidAssessmentItem[]> {
    const assessments = await this.assessmentsRepository.find({
      order: { createdAt: "DESC" },
    });

    return assessments.map((assessment) => ({
      id: assessment.id,
      parentEmail: assessment.parentEmail,
      childAge: assessment.childAge,
      score: assessment.score,
      readinessLevel: assessment.readinessLevel,
      recommendation: assessment.recommendation,
      createdAt: assessment.createdAt,
    }));
  }
}
