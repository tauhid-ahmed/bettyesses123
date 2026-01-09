"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { UserProfile } from "../types";

export type AdminProfileApiResponse = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  image: string | null;
  role: string;
  location: string | null;
  phoneNumber: string | null;
  createdAt: string;
};

export async function getUserProfile(): Promise<UserProfile> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/my-profile`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch profile");
    }

    const data = await res.json();

    if (data?.success && data?.data) {
      const profile = data.data as AdminProfileApiResponse;
      return {
        id: profile.id,
        fullName: `${profile.firstName}${profile.lastName ? " " + profile.lastName : ""}`.trim(),
        email: profile.email,
        location: profile.location || null,
        phoneNumber: profile.phoneNumber || null,
        profilePicture: profile.image || null,
      };
    }

    throw new Error(data?.message || "Invalid response format");
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

}