"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type ApiRecentOrder = {
  id: string;
  userId?: string; // userId is now included in the API response
  orderNumber: string;
  userName: string;
  email: string;
  bookCount: number;
  price: number;
  shipping: number;
  status: string;
  createdAt: string;
};

export type GetRecentOrdersParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export type GetRecentOrdersResponse = {
  data: ApiRecentOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
};

export async function getRecentOrders(
  params: GetRecentOrdersParams = {}
): Promise<GetRecentOrdersResponse | null> {
  const session = await auth();

  try {
    const { page = 1, limit = 10, searchTerm } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    const res = await fetch(
      `${BACKEND_API_URL}/admin/dashboard/recent-orders?${queryParams.toString()}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText || "Something went wrong");
    }

    const data = await res.json();

    if (data.success && data.data && data.meta) {
      return {
        data: data.data,
        meta: data.meta,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return null;
  }
}
