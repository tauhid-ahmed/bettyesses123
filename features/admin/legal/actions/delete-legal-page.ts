"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function deleteLegalPage(id: string) {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/legal/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to delete legal page",
      };
    }

    revalidatePath("/dashboard/privacy-and-policy");
    revalidatePath("/dashboard/terms-and-condition");

    return {
      success: true,
      message: "Page deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting legal page:", error);
    return {
      success: false,
      message: "An error occurred while deleting the page",
    };
  }
}
