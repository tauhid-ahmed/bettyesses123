"use server";

import { BACKEND_API_URL } from "@/constants";
import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";
import { VerifyEmailResponse } from "../types/verify-email";

export const verifyEmail = async (userData: {
  userId: string;
  otpCode: string;
}) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth//email-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data: VerifyEmailResponse = await response.json();

    if (!response.ok || isApiError(data)) {
      throw new Error(data.message);
    }

    if (isApiSuccess(data)) {
      return {
        success: true,
        ...data.data,
        message: data.message,
      };
    }

    return DEFAULT_RETURN;
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return DEFAULT_RETURN;
  }
};

const DEFAULT_RETURN = {
  success: false,
  message: "Something went wrong. Please try again.",
};
