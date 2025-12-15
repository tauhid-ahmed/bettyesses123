import { DetailsTable, DetailsRow } from "@/components/DetailsTable";

type ComplaintSectionProps = {
  complaint: string | null;
};

export function ComplaintSection({ complaint }: ComplaintSectionProps) {
  if (!complaint) {
    return null;
  }

  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="Complaint of the user:" className="border-b-0">
        <div className="text-sm text-gray-700 bg-white border border-gray-200 rounded px-4 py-3 leading-relaxed min-h-[100px]">
          {complaint}
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
