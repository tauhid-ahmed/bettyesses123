export type ForgotPasswordResponse = {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    otpSent: true;
    message: string;
  };
};

export type ErrorResponse = {
  success: boolean;
  message: string;
  errorMessages: [
    {
      path: string;
      message: string;
    }
  ];
};

export type ForgotPasswordApiResponse = ForgotPasswordResponse | ErrorResponse;
