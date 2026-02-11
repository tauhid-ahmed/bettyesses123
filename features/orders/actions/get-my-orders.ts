"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { MyOrdersResponse } from "../types";

export async function getMyOrders(): Promise<MyOrdersResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      data: [],
    };
  }

  try {
    console.log("Fetching orders for User:", session.user.id, session.user.email);  

    const res = await fetch(`${BACKEND_API_URL}/orders/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { tags: ["my-orders"] },
      cache: "no-store", 
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch orders error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch orders",
      data: [],
    };
  }
}
