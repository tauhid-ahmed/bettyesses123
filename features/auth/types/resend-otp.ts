export interface ResendOtpSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    userId: string;
    otpSent: true;
    firstName: string;
    lastName: string;
    message: string;
  };
}

export interface ResendOtpErrorResponse {
  success: false;
  message: string;
  errorId: string;
  timestamp: string;
}

export type ResendOtpResponse =
  | ResendOtpSuccessResponse
  | ResendOtpErrorResponse;
