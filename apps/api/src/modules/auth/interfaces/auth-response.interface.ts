import { UserRole } from "../../users/entities/user.entity";

export interface SafeUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  onboardingCompleted: boolean;
  assessmentResult: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
}
