"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { PromoCode } from "../types";

export async function getPromoCodeById(id: string) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to fetch promo code",
        };
    }

    // Assuming standard response structure: { success: true, data: PromoCode } based on create/list
    // Adjust if needed based on actual API
    return {
      success: true,
      data: data.data as PromoCode,
    };
  } catch (error) {
    console.error("Error fetching promo code:", error);
    return {
      success: false,
      message: "An error occurred while fetching promo code",
    };
  }
}
