"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export async function deleteReview(id: string) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/reviews/${id}`, {
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
        message: result?.message || "Failed to delete review",
      };
    }

    revalidateTag("reviews", "");
    revalidateTag("public-reviews", "");
    revalidateTag("review-stats", "" );

    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message: "An error occurred while deleting the review",
    };
  }
}
