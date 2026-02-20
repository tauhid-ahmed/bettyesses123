import { NextResponse } from "next/server";
import { callCreateAdminApi } from "@/features/admin/settings/actions/create-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body) return NextResponse.json({ success: false, message: "Missing body" }, { status: 400 });

    const { adminName, emailAddress } = body;

    // Normalize payload
    let firstName = "";
    let lastName: string | null = null;
    if (typeof adminName === "string") {
      const parts = adminName.trim().split(/\s+/);
      firstName = parts.shift() || "";
      lastName = parts.length ? parts.join(" ") : null;
    }

    const result = await callCreateAdminApi({ firstName, lastName, email: String(emailAddress) });

    return NextResponse.json(result, { status: result.success ? 201 : (result.statusCode || 400) });
  } catch (error) {
    console.error("API create-admin error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
