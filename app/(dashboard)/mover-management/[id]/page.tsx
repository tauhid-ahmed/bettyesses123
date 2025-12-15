import DetailsContainer from "@/features/admin/components/DetailsContainer";
import DetailsHeading from "@/features/admin/components/DetailsHeading";
import { getMoverDetails } from "@/features/admin/movers/actions/get-mover-details";
import { AboutProviderSection } from "@/features/admin/movers/components/AboutProviderSection";
import { DocumentsSection } from "@/features/admin/movers/components/DocumentsSection";
import { MoverDetailsSection } from "@/features/admin/movers/components/MoverDetailsSection";
import { MoverInfoSection } from "@/features/admin/movers/components/MoverInfoSection";
import { OverallRatingSection } from "@/features/admin/movers/components/OverallRatingSection";
import { SuspendMoverButton } from "@/features/admin/movers/components/SuspendMoverButton";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ moverId: string }>;
};

export default async function MoverDetailsPage({ params }: PageProps) {
  const { moverId } = await params;
  const moverData = await getMoverDetails(moverId);

  if (!moverData) {
    notFound();
  }

  return (
    <DetailsContainer>
      {/* Title */}
      <DetailsHeading
        title="Mover Details"
        description="See The full info On a Mover"
      />

      {/* Content Sections */}
      <div className="space-y-6">
        <MoverInfoSection data={moverData} />
        <MoverDetailsSection data={moverData.moveDetails} />
        <AboutProviderSection text={moverData.aboutProvider} />
        <OverallRatingSection
          rating={moverData.overallRating}
          isTopRated={moverData.isTopRatedProvider}
          moverId={moverId}
        />
        <DocumentsSection documents={moverData.documents} />

        {/* Suspend Button */}
        <div className="flex justify-end pt-4">
          <SuspendMoverButton moverId={moverId} />
        </div>
      </div>
    </DetailsContainer>
  );
}
