export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileView: number;
  image: string | null;
  isEmailVerified: boolean;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  passwordChangedAt: string | null;
  fcmToken: string | null;
  accountWith: string | null;
  isDeleted: boolean;
}

export interface ApiSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: UserProfile;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  data: Record<string, never>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
