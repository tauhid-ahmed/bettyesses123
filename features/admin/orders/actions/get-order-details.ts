"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { Order } from "@/features/admin/users/types";

export async function getOrderDetails(
  orderId: string
): Promise<Order | null> {
  const session = await auth();

  // Try different possible API endpoints
  const possibleEndpoints = [
    `${BACKEND_API_URL}/admin/orders/${orderId}`,
    `${BACKEND_API_URL}/admin/dashboard/orders/${orderId}`,
    `${BACKEND_API_URL}/admin/order/${orderId}`,
  ];

  for (const endpoint of possibleEndpoints) {
    try {
      const res = await fetch(endpoint, {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();

        // Handle different response structures
        if (data.success) {
          // Check if data is nested in data.data or just data
          const orderData = data.data?.order || data.data || data;
          
          // Ensure we have the required userId field
          if (orderData && orderData.userId) {
            return orderData as Order;
          }
          
          // If userId is not directly available, try to get it from nested structure
          if (orderData && orderData.user?.id) {
            return {
              ...orderData,
              userId: orderData.user.id,
            } as Order;
          }
        }
      }
    } catch (error) {
      // Continue to next endpoint
      continue;
    }
  }

  // If all endpoints fail, log and return null
  console.error(`Error fetching order details for orderId: ${orderId}`);
  return null;
}
