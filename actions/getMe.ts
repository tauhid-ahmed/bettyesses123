"use server";

import { cache } from "react";
import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import {
  type ApiSuccessResponse,
  type ApiErrorResponse,
} from "@/types/user-profile";

export const getMe = cache(async () => {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/users/me`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Something went wrong");
    }

    const data = await res.json();

    if (isSuccessResponse(data)) {
      return data.data;
    }

    if (isErrorResponse(data)) {
      throw new Error(data.message);
    }

    return null;
  } catch {
    return null;
  }
});

function isSuccessResponse(
  response: ApiSuccessResponse | ApiErrorResponse
): response is ApiSuccessResponse {
  return (
    response.success &&
    response.statusCode === 200 &&
    Object.keys(response.data).length > 0
  );
}

function isErrorResponse(
  response: ApiSuccessResponse | ApiErrorResponse
): response is ApiErrorResponse {
  return (
    !response.success &&
    response.statusCode !== 200 &&
    Object.keys(response).length <= 0
  );
}
