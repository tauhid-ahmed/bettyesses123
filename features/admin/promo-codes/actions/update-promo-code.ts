"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { CreatePromoCodePayload } from "../types";
import { revalidatePath } from "next/cache";

export async function updatePromoCode(id: string, data: Partial<CreatePromoCodePayload>) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes/${id}`, {
      method: "PATCH",
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
        message: result?.message || "Failed to update promo code",
      };
    }

    revalidatePath("/dashboard/promo-codes");
    revalidatePath(`/dashboard/promo-codes/${id}`);

    return {
      success: true,
      message: result?.message || "Promo code updated successfully",
    };
  } catch (error) {
    console.error("Error updating promo code:", error);
    return {
      success: false,
      message: "An error occurred while updating promo code",
    };
  }
}
