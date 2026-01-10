"use server";

import { auth } from "@/auth";
import { BACKEND_API_URL } from "@/constants";
import { UserDetails } from "../types";

export async function getUserDetails(
  userId: string
): Promise<UserDetails | null> {
  const session = await auth();

  try {
    const res = await fetch(`${BACKEND_API_URL}/admin/users/${userId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(res.statusText || "Something went wrong");
    }

    const data = await res.json();

    if (data.success && data.data) {
      // API response structure: data.data.user, data.data.ongoingOrders, data.data.pastOrders, data.data.totalSpent
      const responseData = data.data;
      
      // Handle location - API returns string like "Dhaka, Dinajpur" but type expects object
      let location = null;
      if (responseData.user.location) {
        // Try to parse location string (format: "city, address" or just "address")
        const locationParts = responseData.user.location.split(",").map((s: string) => s.trim());
        if (locationParts.length >= 2) {
          location = {
            address: locationParts.slice(1).join(", "),
            city: locationParts[0],
            zipcode: "",
          };
        } else {
          location = {
            address: responseData.user.location,
            city: "",
            zipcode: "",
          };
        }
      }
      
      // Map the API response to UserDetails type
      const userDetails: UserDetails = {
        id: responseData.user.id,
        firstName: responseData.user.firstName,
        lastName: responseData.user.lastName,
        email: responseData.user.email,
        image: responseData.user.image,
        role: responseData.user.role,
        status: responseData.user.status,
        location: location,
        phoneNumber: responseData.user.phoneNumber,
        suspendedUntil: responseData.user.suspendedUntil,
        suspensionNote: responseData.user.suspensionNote,
        createdAt: responseData.user.createdAt,
        updatedAt: responseData.user.updatedAt,
        ongoingOrders: responseData.ongoingOrders || [],
        pastOrders: responseData.pastOrders || [],
        totalSpent: responseData.totalSpent || 0,
      };

      return userDetails;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}
