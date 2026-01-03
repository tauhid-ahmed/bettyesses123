"use server";

import { BACKEND_API_URL } from "@/constants";
import { type ForgotPasswordApiResponse } from "../types/forgot-password";
import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";

type ForgotPasswordUserData = {
  email: string;
};

type ForgotPasswordResponse = {
  userId: string | null;
  message: string;
  success: boolean;
};

export async function forgotPassword(
  userData: ForgotPasswordUserData
): Promise<ForgotPasswordResponse> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data: ForgotPasswordApiResponse = await response.json();

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
        userId: data.data.id,
      };
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send password reset email due to unknown error"; // ✅ Correct message

    return {
      message: errorMessage,
      success: false,
      userId: null,
    };
  }
}
