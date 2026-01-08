"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type SuspendedUserApiItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  suspendedUntil: string;
  suspensionNote?: string;
  createdAt: string;
};

export async function getSuspendedUsers(): Promise<
  SuspendedUserApiItem[] | null
> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/suspended/list`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch suspended users");
    }

    const data = await res.json();

    if (data?.success && Array.isArray(data.data)) {
      return data.data as SuspendedUserApiItem[];
    }

    return null;
  } catch (error) {
    console.error("Error fetching suspended users:", error);
    return null;
  }
}
