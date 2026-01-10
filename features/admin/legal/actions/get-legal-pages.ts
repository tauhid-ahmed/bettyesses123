"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { LegalPagesListResponse } from "../types";

export async function getLegalPages(type: "privacy" | "terms"): Promise<LegalPagesListResponse> {
  const session = await auth();
  const endpoint = type === "privacy" ? "/legal/privacy" : "/legal/terms";

  try {
    const res = await fetch(`${BACKEND_API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      next: { tags: ["legal-pages"] },
      cache: "no-store", 
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to fetch legal pages",
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Pages retrieved successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while fetching pages",
    };
  }
}
