"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export type SuspendUserParams = {
  suspendedUntil: string;
  suspensionNote: string;
};

export async function suspendUser(
  userId: string,
  params: SuspendUserParams
) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/${userId}/suspend`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        suspendedUntil: params.suspendedUntil,
        suspensionNote: params.suspensionNote,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || res.statusText || "Something went wrong");
    }

    const data = await res.json();

    revalidatePath(`/dashboard/user-management/${userId}`);
    revalidatePath("/dashboard/user-management");
    revalidatePath(`/dashboard/order-management`);
    revalidatePath(`/dashboard/order-management/${userId}`);

    return {
      success: true,
      message: data.message || "User suspended successfully",
    };
  } catch (error) {
    console.error("Error suspending user:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to suspend user",
    };
  }
}
