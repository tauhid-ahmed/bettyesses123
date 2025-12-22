import DetailsContainer from "@/features/admin/components/DetailsContainer";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import { getUserDetails } from "@/features/admin/users/actions/get-user-details";
import { SuspendUserButton } from "@/features/admin/users/components/SuspendUserButton";
import { UserDetailsSection } from "@/features/admin/users/components/UserDetailsSection";
import { UserInfoSection } from "@/features/admin/users/components/UserInfoSection";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { userId } = await params;
  const userData = await getUserDetails(userId);

  if (!userData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="User Details"
        description="See The full info On a User"
      />

      {/* Content Sections */}
      <div className="space-y-6">
        <UserInfoSection data={userData} />
        <UserDetailsSection data={userData.moveDetails} />

        {/* Suspend Button */}
        <div className="flex justify-end pt-4">
          <SuspendUserButton userId={userId} />
        </div>
      </div>
    </DetailsContainer>
  );
}
