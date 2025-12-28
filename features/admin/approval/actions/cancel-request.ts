"use server";

import { revalidatePath } from "next/cache";

export async function cancelProviderRequest(providerId: string) {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath("/admin/providers");

    return {
      success: true,
      message: "Provider request canceled",
    };
  } catch (error) {
    console.error("Error canceling provider:", error);
    return {
      success: false,
      message: "Failed to cancel provider request",
    };
  }
}
