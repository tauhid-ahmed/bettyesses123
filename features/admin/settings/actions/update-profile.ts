"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";
import { ProfileFormData } from "../types";

export type UpdateProfilePayload = {
  firstName: string;
  lastName?: string | null;
  email: string;
  location?: string | null;
  phoneNumber?: string | null;
  image?: string | null;
};

export async function updateProfile(data: ProfileFormData) {
  const session = await auth();

  try {
    const payload: UpdateProfilePayload = {
      firstName: data.firstName,
      lastName: data.lastName || null,
      email: data.email,
      location: data.location || null,
      phoneNumber: data.phoneNumber || null,
      image: data.image || null,
    };

    const res = await fetch(`${BACKEND_API_URL}/admin/users/my-profile`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseData = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message:
          responseData?.message || res.statusText || "Failed to update profile",
      };
    }

    try {
      revalidatePath("/dashboard/settings?t=admin-info");
    } catch (e) {
      // ignore revalidate failures
    }

    return {
      success: true,
      message: responseData?.message || "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}
