"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ReviewsResponse } from "../types";

interface GetReviewsParams {
  page?: number;
  limit?: number;
  search?: string;
  rating?: number;
}

export async function getReviews(params: GetReviewsParams = {}): Promise<ReviewsResponse> {
  const session = await auth();
  const { page = 1, limit = 10, search = "", rating } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) queryParams.append("search", search);
  if (rating) queryParams.append("rating", rating.toString());

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/reviews?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      next: { tags: ["reviews"] },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to fetch reviews",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while fetching reviews",
      data: [],
    };
  }
}
