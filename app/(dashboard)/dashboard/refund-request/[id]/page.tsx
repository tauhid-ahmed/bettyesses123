import DetailsContainer from "@/features/admin/components/DetailsContainer";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import { getRefundDetails } from "@/features/admin/refunds/actions/get-refund-details";
import { AddedPhotosSection } from "@/features/admin/refunds/components/AddedPhotosSection";
import { JobInfoSection } from "@/features/admin/refunds/components/JobInfoSection";
import { OrderInfoSection } from "@/features/admin/refunds/components/OrderInfoSection";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ refundId: string }>;
};

export default async function RefundRequestPage({ params }: PageProps) {
  const { refundId } = await params;
  const refundData = await getRefundDetails(refundId);

  if (!refundData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="Refund Request"
        description="See All The Info Of A The Move"
      />

      {/* Content Sections */}
      <div className="space-y-8">
        <JobInfoSection data={refundData} />
        <OrderInfoSection data={refundData.orderInfo} />
        <AddedPhotosSection photos={refundData.photos} />
      </div>
    </DetailsContainer>
  );
}
