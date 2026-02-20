"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ReviewsResponse } from "../types";

export async function getPublicReviews(search?: string): Promise<ReviewsResponse> {
  const session = await auth();
  
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/reviews/public?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
       next: { tags: ["public-reviews", "reviews"] }, // Revalidate when necessary
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to fetch public reviews",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching public reviews:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while fetching public reviews",
      data: [],
    };
  }
}
