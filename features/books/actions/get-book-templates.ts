"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { BookTemplateResponse } from "../types/api";

export async function getBookTemplates() {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/books/templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      // Since it's a GET request for templates which might change locally but usually are static-ish, 
      // typically we might want some caching, but for now 'no-store' ensures fresh data or default Next.js caching behavior.
      // Based on previous patterns, we might use 'no-store' or revalidate. 
      // User didn't specify, so 'no-store' is safest for development. 
      cache: "no-store", 
    });

    const data = (await res.json()) as BookTemplateResponse;

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch book templates",
        data: [],
      };
    }

    return {
      success: true,
      data: data.data || [],
    };
  } catch (error) {
    console.error("Error fetching book templates:", error);
    return {
      success: false,
      message: "Failed to fetch book templates",
      data: [],
    };
  }
}
