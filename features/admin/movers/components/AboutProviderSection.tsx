import { DetailsTable, DetailsRow } from "@/components/DetailsTable";

type AboutProviderSectionProps = {
  text: string;
};

export function AboutProviderSection({ text }: AboutProviderSectionProps) {
  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="About Provider:" className="border-b-0">
        <div className="text-sm text-gray-900 bg-white border border-gray-200 rounded px-3 py-2 leading-relaxed">
          {text}
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
