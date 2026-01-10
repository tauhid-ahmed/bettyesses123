"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { CreateLegalPagePayload, LegalPageResponse } from "../types";
import { revalidatePath } from "next/cache";

export async function createLegalPage(payload: CreateLegalPagePayload): Promise<LegalPageResponse> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/legal`, {
      method: "POST",
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
        message: result?.message || "Failed to create legal page",
      };
    }

    revalidatePath("/dashboard/privacy-and-policy");
    revalidatePath("/dashboard/terms-and-condition");

    return {
      success: true,
      statusCode: 201,
      message: "Page created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error creating legal page:", error);
    return {
      success: false,
      statusCode: 500,
      message: "An error occurred while creating/updating the page",
    };
  }
}
