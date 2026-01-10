import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Create FormData for backend
    const backendFormData = new FormData();
    backendFormData.append("image", file);

    // Upload to backend
    const uploadRes = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/upload-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: backendFormData,
        credentials: "include",
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: uploadData?.message || "Failed to upload image",
        },
        { status: uploadRes.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: uploadData.data || uploadData,
        message: uploadData?.message || "Image uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
