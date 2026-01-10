"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { CreatePromoCodePayload } from "../types";
import { revalidatePath } from "next/cache";

export async function createPromoCode(data: CreatePromoCodePayload) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create promo code",
      };
    }

    revalidatePath("/dashboard/promo-codes");

    return {
      success: true,
      message: result?.message || "Promo code created successfully",
    };
  } catch (error) {
    console.error("Error creating promo code:", error);
    return {
      success: false,
      message: "An error occurred while creating promo code",
    };
  }
}
