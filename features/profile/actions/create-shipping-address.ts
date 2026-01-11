"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ShippingAddress, ShippingAddressResponse } from "../types";

export interface CreateShippingAddressPayload {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptBuilding?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  addressType?: string;
}

export async function createShippingAddress(
  payload: CreateShippingAddressPayload
): Promise<ShippingAddressResponse> {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        firstName: payload.firstName,
        lastName: payload.lastName,
        streetAddress: payload.streetAddress,
        aptBuilding: payload.aptBuilding || "",
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        country: payload.country,
        phone: payload.phone,
        addressType: payload.addressType || "HOME",
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to create shipping address",
        data: [],
      };
    }

    return {
      success: true,
      statusCode: result.statusCode || 201,
      message: result.message || "Address created successfully",
      data: result.data ? [result.data] : [],
    };
  } catch (error) {
    console.error("Create shipping address API error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to create shipping address",
      data: [],
    };
  }
}
