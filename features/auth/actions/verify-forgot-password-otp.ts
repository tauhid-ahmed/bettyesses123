"use server";

import { BACKEND_API_URL } from "@/constants";
import { type ForgotPasswordOtpVerifyResponse } from "../types/forgot-password-otp-verify";
import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";

type ForgotPasswordUserData = {
  userId: string;
  otpCode: string;
};

type ForgotPasswordResponse = {
  token: string;
  message: string;
  success: boolean;
};

export async function verifyForgotPasswordOtp(
  userData: ForgotPasswordUserData
): Promise<ForgotPasswordResponse> {
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/auth/verify-reset-password-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data: ForgotPasswordOtpVerifyResponse = await response.json();

    if (!response.ok) {
      const message =
        isApiError(data) && data.message
          ? data.message
          : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (isApiError(data)) {
      throw new Error(data.errorMessages[0].message);
    }

    if (isApiSuccess(data) && data.success) {
      return {
        message: data.message,
        success: true,
        token: data.data.accessToken,
      };
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send password reset email due to unknown error";
    return {
      message: errorMessage,
      success: false,
      token: "",
    };
  }
}
