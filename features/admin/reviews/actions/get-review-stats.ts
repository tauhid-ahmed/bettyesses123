"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ReviewStatsResponse } from "../types";

export async function getReviewStats(): Promise<ReviewStatsResponse> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/reviews/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      next: { tags: ["review-stats", "reviews"] },
    });

    const result = await res.json();

    if (!res.ok) {
        // Fallback or error handling
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to fetch review stats",
        data: {
            totalReviews: 0,
            publicReviews: 0,
            pendingReviews: 0,
            featuredReviews: 0,
            averageRating: 0,
            ratingDistribution: {}
        }
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while fetching review stats",
      data: {
          totalReviews: 0,
          publicReviews: 0,
          pendingReviews: 0,
          featuredReviews: 0,
          averageRating: 0,
          ratingDistribution: {}
      }
    };
  }
}
