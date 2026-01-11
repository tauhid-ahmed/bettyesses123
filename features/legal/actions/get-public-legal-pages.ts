"use server";

import { BACKEND_API_URL } from "@/constants";
import { PublicLegalPagesResponse } from "../types";

export async function getPublicLegalPages(type: "privacy" | "terms"): Promise<PublicLegalPagesResponse> {
  const endpoint = type === "privacy" ? "/legal/public/privacy" : "/legal/public/terms";
  
  try {
    const res = await fetch(`${BACKEND_API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["public-legal", type] }, // Cache for 1 hour, add tags
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to fetch legal pages",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error(`Error fetching public legal pages (${type}):`, error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while fetching legal pages",
      data: [],
    };
  }
}
