import { getUserDetails } from "@/features/admin/users/actions/get-user-details";
import { getUserByEmail } from "@/features/admin/users/actions/get-user-by-email";
import { getOrderDetails } from "@/features/admin/orders/actions/get-order-details";
import { getOrderByIdFromRecent } from "@/features/admin/orders/actions/get-order-by-id-from-recent";
import { notFound } from "next/navigation";
import UserDetailsClient from "./UserDetailsClient";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let userData = null;

  // Strategy 1: Try to get order details from order API
  const orderData = await getOrderDetails(id);
  if (orderData && orderData.userId) {
    userData = await getUserDetails(orderData.userId);
  }

  // Strategy 2: If order API fails, try to get order from recent orders list
  if (!userData) {
    const orderFromRecent = await getOrderByIdFromRecent(id);
    if (orderFromRecent && orderFromRecent.userId) {
      // Use userId directly from recent orders response
      userData = await getUserDetails(orderFromRecent.userId);
    } else if (orderFromRecent && orderFromRecent.email) {
      // Fallback: Try to get user by email if userId is not available
      userData = await getUserByEmail(orderFromRecent.email);
    }
  }

  // Strategy 3: As last resort, try treating the ID as a user ID
  if (!userData) {
    userData = await getUserDetails(id);
  }

  if (!userData) {
    notFound();
  }

  const userName = `${userData.firstName} ${userData.lastName}`.trim();

  return (
    <UserDetailsClient
      userId={userData.id}
      userName={userName}
      email={userData.email}
      role={userData.role}
      ongoingOrders={userData.ongoingOrders || []}
      suspendedUntil={userData.suspendedUntil}
    />
  );
}
