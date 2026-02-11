"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { PromoCodeResponse } from "@/features/admin/promo-codes/types";

export async function getUserPromoCodes(): Promise<PromoCodeResponse> {
  const session = await auth();

  // If endpoint is public for validation but here we want list for user. 
  // Assuming /promocodes returns list for authorized user.
  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      data: [],
    };
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { tags: ["promo-codes"] },
      cache: "no-store" 
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch promo codes",
      data: [],
    };
  }
}
