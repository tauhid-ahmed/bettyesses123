"use server";

import { revalidatePath } from "next/cache";

export async function suspendUser(userId: string) {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath("/admin/user-management");

    return {
      success: true,
      message: "User suspended successfully",
    };
  } catch (error) {
    console.error("Error suspending user:", error);
    return {
      success: false,
      message: "Failed to suspend user",
    };
  }
}
