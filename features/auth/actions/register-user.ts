"use server";

import { BACKEND_API_URL } from "@/constants";
import {
  type SuccessResponse,
  type ErrorResponse,
  type RegisterUserData,
} from "../types/register-user";
import { isApiError, isApiSuccess } from "@/utils/authResponseGuard";

type RegisterUserResponse = Promise<{
  message: string;
  success: boolean;
  userId: string | null;
}>;

export async function registerUser(
  registerUserData: RegisterUserData
): RegisterUserResponse {
  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUserData),
    });

    const data: SuccessResponse | ErrorResponse = await response.json();

    if (!response.ok) {
      const message =
        isApiError(data) && data.message
          ? data.message
          : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (isApiError(data)) {
      throw new Error(data.message);
    }

    if (isSuccessResponse(data)) {
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
        : "Failed to register user due to unknown error";

    return {
      message: errorMessage,
      success: false,
      userId: null,
    };
  }
}

function isSuccessResponse(
  response: SuccessResponse | ErrorResponse
): response is SuccessResponse {
  return isApiSuccess(response) && response.statusCode === 201;
}
