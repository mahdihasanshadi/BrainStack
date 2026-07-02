import type { PurchaseStatus, PaymentProvider } from "../../payments/entities/course-purchase.entity";
import type {
  Gender,
  MediumOfInstruction,
  PreferredLanguage,
} from "../../registration-leads/entities/registration-lead.entity";
import type { UserRole } from "../../users/entities/user.entity";

export interface AdminStatsResponse {
  totals: {
    trialRegistrations: number;
    parentMeetings: number;
    registeredParents: number;
    registeredStudents: number;
    registeredAdmins: number;
    kidAssessments: number;
    coursePurchases: number;
    completedPurchases: number;
    pendingPurchases: number;
  };
  recent: {
    trialRegistrationsLast7Days: number;
    parentMeetingsLast7Days: number;
    purchasesLast7Days: number;
  };
}

export interface AdminClassSlotSummary {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  minAge: number;
  maxAge: number;
}

export interface AdminRegistrationLeadItem {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  mediumOfInstruction: MediumOfInstruction;
  gender: Gender;
  preferredLanguage: PreferredLanguage;
  hasDevice: boolean;
  notes: string | null;
  parentalConsent: boolean;
  consentGivenAt: Date;
  createdAt: Date;
  classSlot: AdminClassSlotSummary;
}

export interface AdminParentMeetingLeadItem {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string | null;
  childAge: number;
  questions: string | null;
  consentGivenAt: Date;
  createdAt: Date;
}

export interface AdminUserItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
}

export interface AdminPurchaseItem {
  id: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  email: string;
  phone: string | null;
  parentName: string | null;
  amountBdt: number;
  originalPriceBdt: number;
  status: PurchaseStatus;
  provider: PaymentProvider;
  paymentMethod: string | null;
  createdAt: Date;
  completedAt: Date | null;
}

export interface AdminKidAssessmentItem {
  id: string;
  parentEmail: string | null;
  childAge: number;
  score: number;
  readinessLevel: string;
  recommendation: string;
  createdAt: Date;
}
