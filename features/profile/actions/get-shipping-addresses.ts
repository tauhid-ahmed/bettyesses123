"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ShippingAddressResponse } from "../types";

export async function getShippingAddresses(): Promise<ShippingAddressResponse> {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        data: [],
      };
    }

    const res = await fetch(`${BACKEND_API_URL}/shipping-addresses`, {
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
    console.error("Shipping address API error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch shipping addresses",
      data: [],
    };
  }
}
