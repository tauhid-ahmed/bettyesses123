"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export async function removeFromCartAction(id: string) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Remove from cart error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to remove item from cart",
    };
  }
}
