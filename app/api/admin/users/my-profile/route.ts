import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(`${BACKEND_API_URL}/admin/users/my-profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.message || res.statusText },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile retrieved successfully",
        data: data?.data || data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const backendForm = new FormData();

      for (const [key, value] of formData.entries()) {
        // If value is a File, append directly
        if (value instanceof File) {
          backendForm.append(key, value, (value as File).name);
        } else {
          backendForm.append(key, String(value));
        }
      }

      const res = await fetch(`${BACKEND_API_URL}/admin/users/my-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          // NOTE: do NOT set Content-Type for FormData - fetch will set multipart boundary
        },
        body: backendForm,
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return NextResponse.json(
          { success: false, message: data?.message || res.statusText },
          { status: res.status }
        );
      }

      try {
        revalidatePath("/dashboard/settings");
      } catch {
        // ignore
      }

      return NextResponse.json(
        {
          success: true,
          message: data?.message || "Profile updated",
          data: data?.data || data,
        },
        { status: 200 }
      );
    }

    // Otherwise assume JSON
    const body = await req.json();

    const res = await fetch(`${BACKEND_API_URL}/admin/users/my-profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.message || res.statusText },
        { status: res.status }
      );
    }

    try {
      revalidatePath("/dashboard/settings");
    } catch {
      // ignore
    }

    return NextResponse.json(
      {
        success: true,
        message: data?.message || "Profile updated",
        data: data?.data || data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error proxying profile update:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
