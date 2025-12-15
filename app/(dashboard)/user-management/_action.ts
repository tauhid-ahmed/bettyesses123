"use server";

import { getAccessToken } from "@/lib/getServerAuth";
import { revalidateTag } from "next/cache";

export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const token = await getAccessToken();

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to delete user: ${response.statusText}`
      );
    }

    revalidateTag("users", "");
    revalidateTag("metrics", "");
    revalidateTag("charts", "");
    revalidateTag("new-users", "");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}
