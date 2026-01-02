export type ForgotPasswordOtpVerifyErrorResponse = {
  success: false;
  message: string;
  errorMessages: [
    {
      path: string;
      message: string;
    }
  ];
};

export type ForgotPasswordOtpVerifySuccessResponse = {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    accessToken: string;
  };
};

export type ForgotPasswordOtpVerifyResponse =
  | ForgotPasswordOtpVerifyErrorResponse
  | ForgotPasswordOtpVerifySuccessResponse;
