import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";

type UserDetailsSectionProps = {
  data: {
    totalService: number;
    ongoingService: number;
    completedService: number;
    canceledService: number;
  };
};

export function UserDetailsSection({ data }: UserDetailsSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <DetailsTable>
        <DetailsRow label="User Details:">
          <FieldsGrid cols={2}>
            <LabeledField
              label="Total service"
              value={data.totalService.toString()}
            />
            <LabeledField
              label="Completed service"
              value={data.completedService.toString()}
            />
            <LabeledField
              label="Ongoing service"
              value={data.ongoingService.toString()}
            />
            <LabeledField
              label="Canceled service"
              value={data.canceledService.toString()}
            />
          </FieldsGrid>
        </DetailsRow>
      </DetailsTable>
    </div>
  );
}
