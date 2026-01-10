"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export type UpdateOrderStatusParams = {
  status: "COMPLETED" | "CANCELLED" | "PENDING";
};

export async function updateOrderStatus(
  orderId: string,
  params: UpdateOrderStatusParams
) {
  const session = await auth();

  try {
    if (!session?.user?.accessToken) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    // API endpoint for updating order status
    const url = `${BACKEND_API_URL}/orders/${orderId}/status`;

    const res = await fetch(url, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: params.status,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      let errorMessage = "Something went wrong";
      
      if (res.status === 404) {
        errorMessage = `API endpoint not found: ${url}. Please check if the endpoint exists on the backend.`;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (res.statusText) {
        errorMessage = res.statusText;
      }
      
      console.error(`Order status update failed - Status: ${res.status}, URL: ${url}, Message: ${errorMessage}`, errorData);
      throw new Error(errorMessage);
    }

    const data = await res.json();
    revalidatePath(`/dashboard/order-management`);
    revalidatePath(`/dashboard/order-management/${orderId}`);

    return {
      success: true,
      message: data.message || "Order status updated successfully",
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === "string"
      ? error
      : "An unknown error occurred";
    
    return {
      success: false,
      message: errorMessage || "Failed to update order status",
    };
  }
}
