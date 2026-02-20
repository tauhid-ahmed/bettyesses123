"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type UserStatsData = {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  suspendedUsers: number;
};

export async function getUserStats(): Promise<UserStatsData | null> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/stats`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Something went wrong");
    }

    const data = await res.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
}
