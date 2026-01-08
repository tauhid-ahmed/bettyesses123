"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function postEndSuspension(formData: FormData) {
    
  const userId = formData.get("userId");
  if (!userId || typeof userId !== "string") {
    return { success: false, message: "Missing user id" };
  }

  return endSuspension(String(userId));
}

export async function endSuspension(userId: string) {
  const session = await auth();

  try {
    const res = await fetch(
      `${BACKEND_API_URL}/admin/users/${userId}/end-suspension`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || res.statusText || "Failed to end suspension",
      };
    }

    try {
      revalidatePath("/admin/settings");
    } catch (e) {
      // ignore revalidate failures
    }

    return { success: true, message: data?.message || "Suspension ended" };
  } catch (error) {
    console.error("Error ending suspension:", error);
    return { success: false, message: "Server error" };
  }
}
