"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

type CreateAdminPayload = {
	firstName: string;
	lastName?: string | null;
	email: string;
};

async function callCreateAdminApi(payload: CreateAdminPayload) {
	const session = await auth();

	try {
		const res = await fetch(`${BACKEND_API_URL}/admin/users/admins/create`, {
			credentials: "include",
			method: "POST",
			headers: {
				Authorization: `Bearer ${session?.user?.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			cache: "no-store",
		});

		const data = await res.json().catch(() => null);

		if (!res.ok) {
			return {
				success: false,
				message: data?.message || res.statusText || "Failed to create admin",
				statusCode: res.status,
			} as const;
		}

		try {
			revalidatePath("/dashboard/settings?t=top-providers");
		} catch (e) {
			// ignore revalidate failures
		}

		return {
			success: true,
			message: data?.message || "Admin created successfully",
			data: data?.data || null,
			statusCode: res.status,
		} as const;
	} catch (error) {
		console.error("Error creating admin:", error);
		return { success: false, message: "Server error", statusCode: 500 } as const;
	}
}

export async function createAdmin(formData: FormData) {
	const name = formData.get("adminName");
	const email = formData.get("emailAddress");

	if (!name || typeof name !== "string") {
		return { success: false, message: "Missing admin name" };
	}

	if (!email || typeof email !== "string") {
		return { success: false, message: "Missing email address" };
	}

	const parts = name.trim().split(/\s+/);
	const firstName = parts.shift() || "";
	const lastName = parts.length ? parts.join(" ") : null;

	return callCreateAdminApi({ firstName, lastName, email });
}

export { callCreateAdminApi };

