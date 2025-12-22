import { getServiceDetails } from "@/features/admin/complaint-box/actions/get-service-details";
import { AddedPhotosSection } from "@/features/admin/complaint-box/components/AddedPhotosSection";
import { ComplaintSection } from "@/features/admin/complaint-box/components/ComplaintSection";
import { JobInfoSection } from "@/features/admin/complaint-box/components/JobInfoSection";
import { OrderInfoSection } from "@/features/admin/complaint-box/components/OrderInfoSection";
import DetailsContainer from "@/features/admin/components/DetailsContainer";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ serviceId: string }>;
};

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { serviceId } = await params;
  const serviceData = await getServiceDetails(serviceId);

  if (!serviceData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="Service Details"
        description="See All The Info Of A The Move"
      />

      {/* Content Sections */}
      <div className="space-y-8">
        <JobInfoSection data={serviceData} />
        <OrderInfoSection data={serviceData.orderInfo} />
        <AddedPhotosSection photos={serviceData.photos} />
        <ComplaintSection complaint={serviceData.complaint} />
      </div>
    </DetailsContainer>
  );
}
