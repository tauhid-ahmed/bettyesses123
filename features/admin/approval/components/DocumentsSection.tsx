import { DetailsTable, DetailsRow } from "@/components/DetailsTable";
import { ProviderDocument } from "../types";
import Image from "next/image";

type DocumentsSectionProps = {
  documents: ProviderDocument[];
};

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  return (
    <DetailsTable className="border-t p-4">
      {documents.map((doc) => (
        <DetailsRow key={doc.id} label="Uploaded Document:">
          <div>
            <p className="text-xs text-gray-500 mb-2">{doc.label}</p>
            <div className="relative w-full aspect-2/1 md:aspect-3/1 lg:aspect-4/1 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src={doc.imageUrl}
                alt={doc.label}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </DetailsRow>
      ))}
    </DetailsTable>
  );
}
