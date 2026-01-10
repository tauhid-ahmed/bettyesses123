"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { UpdateLegalPagePayload, LegalPageResponse } from "../types";
import { revalidatePath } from "next/cache";

export async function updateLegalPage(id: string, payload: UpdateLegalPagePayload): Promise<LegalPageResponse> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/legal/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Failed to update legal page",
      };
    }

    revalidatePath("/dashboard/privacy-and-policy");
    revalidatePath("/dashboard/terms-and-condition");

    return {
      success: true,
      statusCode: 200,
      message: "Page updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating legal page:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while updating the page",
    };
  }
}
