export type ResetPasswordApiSuccessResponse = {
  success: true;
  statusCode: 200;
  message: string;
};

export type ResetPasswordApiErrorResponse = {
  success: false;
  message: string;
  errorMessages: [
    {
      path: "newPassword";
      message: "password should be minimum 8 characters ";
    }
  ];
};

export type ResetPasswordApiResponse =
  | ResetPasswordApiSuccessResponse
  | ResetPasswordApiErrorResponse;
