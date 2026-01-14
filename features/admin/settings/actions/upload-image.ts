"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export async function uploadProfileImage(formData: FormData) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}/profile/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
        // Revalidate any relevant tags
        revalidateTag("/dashboard/settings");
    }

    return result;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return {
      success: false,
      message: "Failed to upload image",
    };
  }
}
