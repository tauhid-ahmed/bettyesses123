"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { PromoCodeResponse } from "../types";

export async function getPromoCodes() {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      cache: "no-store",
    });

    const data = (await res.json()) as PromoCodeResponse;

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch promo codes",
        data: [],
      };
    }

    return {
      success: true,
      data: data.data || [],
    };
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return {
      success: false,
      message: "Failed to fetch promo codes",
      data: [],
    };
  }
}
