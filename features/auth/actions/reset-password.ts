"use server";

import { BACKEND_API_URL } from "@/constants";
import { type ResetPasswordApiResponse } from "../types/reset-password";
import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";

type ResetPasswordUserData = {
  newPassword: string;
  token: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export async function resetPassword(
  userData: ResetPasswordUserData
): Promise<ResetPasswordResponse> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        newPassword: userData.newPassword,
      }),
    });

    const data: ResetPasswordApiResponse = await response.json();

    if (!response.ok) {
      const message =
        isApiError(data) && data.message
          ? data.errorMessages[0].message
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
      };
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update password";

    return {
      message: errorMessage,
      success: false,
    };
  }
}
