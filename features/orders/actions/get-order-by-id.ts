"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { OrderResponse } from "../types";

export async function getOrderById(id: string): Promise<OrderResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      data: {} as any,
    };
  }

  try {
    const url = `${BACKEND_API_URL}/orders/${id}`;
    console.log("Fetching order from URL:", url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch order error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch order",
      data: {} as any,
    };
  }
}
