"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export async function cancelOrder(orderId: string) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/orders/${orderId}/cancel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag("my-orders");
    }

    return result;
  } catch (error) {
    console.error("Cancel order error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to cancel order",
    };
  }
}
