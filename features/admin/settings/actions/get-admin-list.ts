"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";

export type AdminItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  createdAt: string;
};

export async function getAdminList(): Promise<AdminItem[] | null> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/admins/list`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch admins");
    }

    const data = await res.json();

    if (data?.success && Array.isArray(data.data)) {
      return data.data as AdminItem[];
    }

    return null;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return null;
  }
}
