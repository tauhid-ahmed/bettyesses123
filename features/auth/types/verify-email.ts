import { UserRole } from "@/types/auth";

export type VerifyEmailErrorResponse = {
  success: false;
  message: string;
  errorId: string;
  errorMessages: [
    {
      message: string;
    }
  ];
};

export type VerifyEmailSuccessResponse = {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    image: null;
    status: string;
    isVerified: true;
    accessToken: string;
    refreshToken: string;
    message: string;
  };
};

export type VerifyEmailResponse =
  | VerifyEmailSuccessResponse
  | VerifyEmailErrorResponse;
