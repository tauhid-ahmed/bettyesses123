"use server";

import { PasswordFormData } from "../types";

export async function changePassword(data: PasswordFormData) {
  try {
    // TODO: Replace with actual API call
    // const token = await getAccessToken();
    // const response = await fetch(`${process.env.API_BASE_URL}/auth/change-password`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     oldPassword: data.oldPassword,
    //     newPassword: data.newPassword,
    //   }),
    // });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success

    return {
      success: true,
      message: "Password changed successfully",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      message: "Failed to change password. Please try again.",
    };
  }
}
