"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { UserDetails } from "../types";

/**
 * Get user details by email
 * This is a fallback when we have email but not user ID
 */
export async function getUserByEmail(
  email: string
): Promise<UserDetails | null> {
  const session = await auth();

  try {
    // Try to search for user by email using the users API with searchTerm
    const res = await fetch(
      `${BACKEND_API_URL}/admin/users?page=1&limit=1&searchTerm=${encodeURIComponent(email)}`,
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
      return null;
    }

    const data = await res.json();

    if (data.success && data.data && Array.isArray(data.data)) {
      // Find exact email match
      const user = data.data.find(
        (u: { email: string }) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        // Fetch full user details using the user ID
        const userDetailsRes = await fetch(
          `${BACKEND_API_URL}/admin/users/${user.id}`,
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

        if (userDetailsRes.ok) {
          const userDetailsData = await userDetailsRes.json();
          if (userDetailsData.success && userDetailsData.data) {
            return userDetailsData.data;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}
