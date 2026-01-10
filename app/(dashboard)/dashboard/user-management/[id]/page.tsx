import { getUserDetails } from "@/features/admin/users/actions/get-user-details";
import { notFound } from "next/navigation";
import UserDetailsClient from "./UserDetailsClient";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch user details from API
  const userData = await getUserDetails(id);

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
