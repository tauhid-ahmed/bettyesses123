"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { PasswordFormData } from "../types";

export async function changePassword(data: PasswordFormData) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/profile/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }),
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to change password",
      };
    }

    return {
      success: true,
      message: result?.message || "Password changed successfully",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      message: "An error occurred while changing password",
    };
  }
}
