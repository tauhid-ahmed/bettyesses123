"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { UpdateProfilePayload, ProfileResponse } from "../types";
import { revalidateTag } from "next/cache";

export async function updateProfile(payload: UpdateProfilePayload): Promise<ProfileResponse> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/profile/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag("profile");
    }

    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update profile",
      data: {} as any,
    };
  }
}
