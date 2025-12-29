"use server";

import { BACKEND_API_URL } from "@/constants";
import {
  type SuccessResponse,
  type ErrorResponse,
  type RegisterUserData,
} from "../types/register-user";

export async function registerUser(
  registerUserData: RegisterUserData
): Promise<{ message: string; success: boolean }> {
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
        isErrorResponse(data) && data.message
          ? data.message
          : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (isErrorResponse(data)) {
      throw new Error(data.message);
    }

    if (isSuccessResponse(data)) {
      return {
        message: data.message,
        success: true,
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
    };
  }
}

// Type guards
function isSuccessResponse(
  response: SuccessResponse | ErrorResponse
): response is SuccessResponse {
  return response.success === true && response.statusCode === 201;
}

function isErrorResponse(
  response: SuccessResponse | ErrorResponse
): response is ErrorResponse {
  return response.success === false;
}
