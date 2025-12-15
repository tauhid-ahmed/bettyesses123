import { DetailsTable, DetailsRow } from "@/components/DetailsTable";

type AboutProviderSectionProps = {
  text: string;
};

export function AboutProviderSection({ text }: AboutProviderSectionProps) {
  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="About Provider:">
        <div className="text-sm text-gray-700 leading-relaxed">{text}</div>
      </DetailsRow>
    </DetailsTable>
  );
}
