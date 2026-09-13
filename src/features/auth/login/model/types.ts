import type { User } from "@entities/user/model/types";

export interface AuthResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}
