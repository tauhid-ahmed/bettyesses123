"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export interface DeleteShippingAddressResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export async function deleteShippingAddress(
  addressId: string
): Promise<DeleteShippingAddressResponse> {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    const res = await fetch(`${BACKEND_API_URL}/shipping-addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to delete shipping address",
      };
    }

    return {
      success: true,
      statusCode: result.statusCode || 200,
      message: result.message || "Address deleted successfully",
    };
  } catch (error) {
    console.error("Delete shipping address API error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to delete shipping address",
    };
  }
}
