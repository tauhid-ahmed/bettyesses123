"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export interface ProcessPaymentPayload {
  orderId: string;
  paymentMethodId: string;
}

export interface ProcessPaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    receiptUrl?: string;
    [key: string]: any;
  };
}

export async function processPayment(
  payload: ProcessPaymentPayload
): Promise<ProcessPaymentResponse> {
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

    const res = await fetch(`${BACKEND_API_URL}/payments/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        orderId: payload.orderId,
        paymentMethodId: payload.paymentMethodId,
      }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to process payment",
        data: {} as any,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode || 200,
      message: result.message || "Payment processed successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Process payment API error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to process payment",
      data: {} as any,
    };
  }
}
