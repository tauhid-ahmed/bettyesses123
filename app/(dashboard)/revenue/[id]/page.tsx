import { notFound } from "next/navigation";
import { getRevenueDetails } from "../../../../features/admin/revenue/actions/get-revenue-details";
import { AddedPhotosSection } from "../../../../features/admin/revenue/components/AddedPhotosSection";
import { JobInfoSection } from "../../../../features/admin/revenue/components/JobInfoSection";
import { OrderInfoSection } from "../../../../features/admin/revenue/components/OrderInfoSection";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import DetailsContainer from "@/features/admin/components/DetailsContainer";

type PageProps = {
  params: Promise<{ revenueId: string }>;
};

export default async function RevenueDetailsPage({ params }: PageProps) {
  const { revenueId } = await params;
  const revenueData = await getRevenueDetails(revenueId);

  if (!revenueData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="Revenue Details"
        description="See All The Info Of A The Move"
      />

      {/* Content Sections */}
      <div className="space-y-8">
        <JobInfoSection data={revenueData} />
        <OrderInfoSection data={revenueData.orderInfo} />
        <AddedPhotosSection photos={revenueData.photos} />
      </div>
    </DetailsContainer>
  );
}
