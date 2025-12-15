"use server";

import { revalidatePath } from "next/cache";

export async function updateTopRatedStatus(
  moverId: string,
  isTopRated: boolean
) {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Updating mover ${moverId} top rated status to:`, isTopRated);

    revalidatePath(`/admin/movers/${moverId}`);

    return {
      success: true,
      message: `Mover ${isTopRated ? "marked" : "unmarked"} as top rated`,
    };
  } catch (error) {
    console.error("Error updating top rated status:", error);
    return {
      success: false,
      message: "Failed to update status",
    };
  }
}
