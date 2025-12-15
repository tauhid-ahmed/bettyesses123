import Image from "next/image";
import { MoverDocument } from "../types";
import { DetailsTable, DetailsRow } from "@/components/DetailsTable";

type DocumentsSectionProps = {
  documents: MoverDocument[];
};

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <DetailsTable className="border-t pt-4">
      {documents.map((doc, index) => (
        <DetailsRow
          key={doc.id}
          label="Uploaded Document:"
          className={index === documents.length - 1 ? "border-b-0" : ""}
        >
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
