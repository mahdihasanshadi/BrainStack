import { UserRole } from "../../users/entities/user.entity";
import {
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_TYPE,
} from "../constants/auth.constants";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  type: typeof ACCESS_TOKEN_TYPE;
}

export interface RefreshTokenPayload {
  sub: string;
  type: typeof REFRESH_TOKEN_TYPE;
  jti: string;
}
