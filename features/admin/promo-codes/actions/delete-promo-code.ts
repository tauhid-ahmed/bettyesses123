"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function deletePromoCode(id: string) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/promocodes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to delete promo code",
      };
    }

    revalidatePath("/dashboard/promo-codes");

    return {
      success: true,
      message: result?.message || "Promo code deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting promo code:", error);
    return {
      success: false,
      message: "An error occurred while deleting promo code",
    };
  }
}
