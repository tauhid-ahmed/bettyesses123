export type ResetPasswordOtpVerifyErrorResponse = {
  success: false;
  message: string;
};

export type ResetPasswordOtpVerifySuccessResponse = {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    accessToken: string;
  };
};
