import { getProviderInfo } from "@/features/admin/approval/actions/get-provider-info";
import { AboutProviderSection } from "@/features/admin/approval/components/AboutProviderSection";
import { ActionButtons } from "@/features/admin/approval/components/ActionButtons";
import { DocumentsSection } from "@/features/admin/approval/components/DocumentsSection";
import { ProviderInfoSection } from "@/features/admin/approval/components/ProviderInfoSection";
import DetailsContainer from "@/features/admin/components/DetailsContainer";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ providerId: string }>;
};

export default async function ProviderInfoPage({ params }: PageProps) {
  const { providerId } = await params;
  const providerData = await getProviderInfo(providerId);

  if (!providerData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="Provider Info"
        description=" See All The Info The Mover Uploaded"
      />

      {/* Content Sections */}
      <div className="space-y-8">
        <ProviderInfoSection data={providerData} />
        <AboutProviderSection text={providerData.aboutProvider} />
        <DocumentsSection documents={providerData.documents} />
      </div>

      {/* Action Buttons */}
      <ActionButtons providerId={providerId} />
    </DetailsContainer>
  );
}
