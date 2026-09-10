import type { User } from "@entities/user/model/types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}
