"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type ApiUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  _count: {
    orders: number;
    books: number;
  };
  orderedBooks: number;
  hasOngoingOrder: boolean;
};

export type GetUsersParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
};

export type GetUsersResponse = {
  data: ApiUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
};

export async function getUsers(
  params: GetUsersParams = {}
): Promise<GetUsersResponse | null> {
  const session = await auth();

  try {
    const { page = 1, limit = 20, searchTerm, status } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    if (status) {
      queryParams.append("status", status);
    }

    const res = await fetch(
      `${BACKEND_API_URL}/admin/users?${queryParams.toString()}`,
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
    console.error("Error fetching users:", error);
    return null;
  }
}
