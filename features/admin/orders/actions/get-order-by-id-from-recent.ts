"use server";

import { getRecentOrders } from "@/features/admin/analytics/actions/get-recent-orders";

export type OrderWithUserInfo = {
  id: string;
  userId: string;
  email: string;
  userName: string;
};

/**
 * Get order information from recent orders list by order ID
 * This is a fallback when the order details API is not available
 * The recent orders API now includes userId in the response
 */
export async function getOrderByIdFromRecent(
  orderId: string
): Promise<OrderWithUserInfo | null> {
  try {
    // Fetch recent orders with a high limit to find the order
    const ordersResponse = await getRecentOrders({
      page: 1,
      limit: 100, // High limit to find the order
    });

    if (!ordersResponse || !ordersResponse.data) {
      return null;
    }

    // Find the order with matching ID
    const order = ordersResponse.data.find((o) => o.id === orderId);

    if (!order) {
      return null;
    }

    // Extract userId from the order (API response now includes userId)
    const userId = order.userId;

    if (!userId) {
      return null;
    }

    return {
      id: order.id,
      userId: userId,
      email: order.email,
      userName: order.userName,
    };
  } catch (error) {
    console.error("Error fetching order from recent orders:", error);
    return null;
  }
}
