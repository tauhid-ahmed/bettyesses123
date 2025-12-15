import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";

type MoverDetailsSectionProps = {
  data: {
    totalService: number;
    ongoingService: number;
    completedService: number;
    canceledService: number;
  };
};

export function MoverDetailsSection({ data }: MoverDetailsSectionProps) {
  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="Move Details:" className="border-b-0">
        <FieldsGrid cols={2}>
          <LabeledField label="Total service" value={data.totalService} />
          <LabeledField
            label="Completed service"
            value={data.completedService}
          />
          <LabeledField label="Ongoing service" value={data.ongoingService} />
          <LabeledField label="Canceled service" value={data.canceledService} />
        </FieldsGrid>
      </DetailsRow>
    </DetailsTable>
  );
}
