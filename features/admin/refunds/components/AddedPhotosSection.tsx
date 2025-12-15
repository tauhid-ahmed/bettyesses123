import Image from "next/image";
import { DetailsTable, DetailsRow } from "@/components/DetailsTable";

type AddedPhotosSectionProps = {
  photos: string[];
};

export function AddedPhotosSection({ photos }: AddedPhotosSectionProps) {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="Added Photo:">
        <div className="flex flex-wrap gap-3">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
