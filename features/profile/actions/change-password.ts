"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export async function changePassword(payload: any) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/profile/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      message: "Failed to change password",
    };
  }
}
