/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { SingleReviewResponse } from "../types";
import { revalidateTag } from "next/cache";

export async function approveReview(id: string): Promise<SingleReviewResponse> {
  const session = await auth();

  try {
    // Determine the endpoint. Review says /approve makes it public. 
    // If it's a toggle, we might need logic, but the prompt says 
    // "Method, API : /admin/reviews/:reviewId/approve"
    // "Review approved and made public"
    // Does check if it's already public? The prompt asks "make a user's review Public or Private". 
    // Ideally there's also an unapprove endpoint or PATCH.
    // Given instructions: "Method, API : /admin/reviews/:reviewId/approve"
    // I will assume this is for 'Public' state. If I need 'Private', I might need another endpoint or check if this toggles.
    // For now, I will use this endpoint for "Make Public". 
    // If "Private" is needed, I'll check if there is a 'reject' or 'hide' or if approve toggles.
    // Assuming 'approve' sets isPublic=true.
    
    // Modification: If the user wants to toggle, I should check if there is a /reject or similar. 
    // The prompt says "admin can make a user's review Public or Private".
    // I will stick to what's provided: `/approve`. 
    // If valid code requires making private, I might need to clarify or guess. 
    // Usually there is a corresponding action. 
    // I'll implement approve for now and assume it handles the public transition.
    
    const res = await fetch(`${BACKEND_API_URL}/admin/reviews/${id}/approve`, {
      method: "POST", // Usually actions like this are POST or PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to approve review",
        data: result.data, // might be undefined
      };
    }

    revalidateTag("reviews", "");
    revalidateTag("public-reviews",'');
    revalidateTag("review-stats" , '');

    return result;
  } catch (error) {
    console.error("Error approving review:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while approving the review",
      data: {} as any,
    };
  }
}
