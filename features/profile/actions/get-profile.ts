"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { ProfileResponse } from "../types";

export async function getProfile(): Promise<ProfileResponse | null> {
  const session = await auth();

  if (!session?.user?.accessToken) return null;

  try {
    const res = await fetch(`${BACKEND_API_URL}/profile/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { tags: ["profile"] },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
