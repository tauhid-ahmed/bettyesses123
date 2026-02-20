"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export interface CreateOrderPayload {
  email: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CreateOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    orderNumber: string;
    status: string;
    [key: string]: any;
  };
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        data: {} as any,
      };
    }

    const res = await fetch(`${BACKEND_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        firstName: payload.firstName,
        lastName: payload.lastName,
        streetAddress: payload.streetAddress,
        city: payload.city,
        state: payload.state,
        postalCode: payload.postalCode,
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to create order",
        data: {} as any,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode || 201,
      message: result.message || "Order created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create order API error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to create order",
      data: {} as any,
    };
  }
}
