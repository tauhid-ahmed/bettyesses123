"use server";

import { revalidatePath } from "next/cache";

export async function suspendMover(moverId: string) {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath("/admin/movers");

    return {
      success: true,
      message: "Mover suspended successfully",
    };
  } catch (error) {
    console.error("Error suspending mover:", error);
    return {
      success: false,
      message: "Failed to suspend mover",
    };
  }
}
