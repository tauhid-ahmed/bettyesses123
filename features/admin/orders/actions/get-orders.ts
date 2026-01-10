"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type GetOrdersParams = {
  page?: number;
  limit?: number;
  status?: "COMPLETED" | "CANCELLED" | "PENDING" | string;
  searchTerm?: string;
};

export type ApiOrder = {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  total: number;
  orderItems: Array<{
    id: string;
    orderId: string;
    bookId: string;
    price: number;
    format: string;
    createdAt: string;
    updatedAt: string;
  }>;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetOrdersResponse = {
  data: ApiOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
};

export async function getOrders(
  params: GetOrdersParams = {}
): Promise<GetOrdersResponse | null> {
  const session = await auth();

  try {
    const { page = 1, limit = 20, status, searchTerm } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    
    if (status) {
      queryParams.append("status", status);
    }
    
    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    const url = `${BACKEND_API_URL}/orders?${queryParams.toString()}`;

    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error fetching orders - Status: ${res.status}, URL: ${url}`);
      return null;
    }

    const data = await res.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      return {
        data: data.data,
        meta: {
          total: data.meta?.total || 0,
          page: data.meta?.page || page,
          limit: data.meta?.limit || limit,
          totalPage: data.meta?.totalPage || 1,
        },
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
