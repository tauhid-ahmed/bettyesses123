"use server";

import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";
import type { ResendOtpResponse } from "../types/resend-otp";
import { BACKEND_API_URL } from "@/constants";

type ResendOtpResult = {
  success: boolean;
  message: string;
  userId: string;
};

export async function resendOTP(userId: string): Promise<ResendOtpResult> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data: ResendOtpResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message ?? "Failed to resend OTP",
        userId: "",
      };
    }

    if (isApiError(data)) {
      return {
        success: false,
        message: data.message,
        userId: "",
      };
    }

    if (isApiSuccess(data)) {
      return {
        success: true,
        message: data.message,
        userId: data.data.userId,
      };
    }

    return {
      success: false,
      message: "Unexpected server response",
      userId: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please try again.",
      userId: "",
    };
  }
}
