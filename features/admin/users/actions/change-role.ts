"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export type ChangeRoleParams = {
  role: "ADMIN" | "USER" | "SUPERADMIN";
};

export async function changeUserRole(
  userId: string,
  params: ChangeRoleParams
) {
  const session = await auth();

  try {
    if (!session?.user?.accessToken) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const url = `${BACKEND_API_URL}/admin/users/${userId}/role`;
    console.log("Role change - URL:", url);
    console.log("Role change - Body:", { role: params.role });

    const res = await fetch(url, {
      credentials: "include",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: params.role,
      }),
      cache: "no-store",
    });

    console.log("Role change - Response status:", res.status);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      let errorMessage = "Something went wrong";
      
      if (res.status === 404) {
        errorMessage = `API endpoint not found: ${url}. Please check if the endpoint exists on the backend.`;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (res.statusText) {
        errorMessage = res.statusText;
      }
      
      console.error(`Role change failed - Status: ${res.status}, URL: ${url}, Message: ${errorMessage}`, errorData);
      throw new Error(errorMessage);
    }

    const data = await res.json();

    revalidatePath(`/dashboard/user-management/${userId}`);
    revalidatePath("/dashboard/user-management");
    revalidatePath(`/dashboard/order-management`);
    revalidatePath(`/dashboard/order-management/${userId}`);

    return {
      success: true,
      message: data.message || "User role changed successfully",
    };
  } catch (error) {
    console.error("Error changing user role:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to change user role",
    };
  }
}
