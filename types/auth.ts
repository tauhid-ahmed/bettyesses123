export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  accountTypes: string[];
  profileImage?: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface CredentialsLoginRequest {
  email: string;
  password: string;
}
