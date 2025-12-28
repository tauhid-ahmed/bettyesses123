export type UserStatus = "ACTIVE" | "SUSPENDED";
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  gender: string | null;
  address: string;
  zipCode: string;
  phone: string;
  accountTypes: string[];
  currentAccountType: string | null;
  status: UserStatus;
  role: UserRole;
  isAccountVerified: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface ProfileResponse {
  success: true;
  message: string;
  data: UserProfile;
}
