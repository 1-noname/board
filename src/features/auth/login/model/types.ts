import type { User } from "@entities/user/model/schema";

export interface AuthResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}
