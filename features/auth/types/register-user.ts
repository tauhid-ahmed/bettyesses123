export type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SuccessResponse = {
  success: true;
  statusCode: 201;
  message: string;
  data: {
    id: string;
    message: string;
    authType: "register";
  };
};

export type ErrorResponse = {
  success: false;
  message: string;
  errorId: string;
  timestamp: Date;
  errorMessages: [
    {
      path: string;
      message: string;
    }
  ];
};

export type RegisterUserResponse = SuccessResponse | ErrorResponse;
