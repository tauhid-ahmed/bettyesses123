"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { CartResponse } from "../types";

export async function getCart(): Promise<CartResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      data: {} as any,
    };
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch cart error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch cart",
      data: {} as any,
    };
  }
}
