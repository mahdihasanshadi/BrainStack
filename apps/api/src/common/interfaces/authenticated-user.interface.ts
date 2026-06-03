import { UserRole } from "../../modules/users/entities/user.entity";

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: UserRole;
}
