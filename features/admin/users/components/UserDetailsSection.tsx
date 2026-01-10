import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";
import { UserDetails } from "../types";

type UserDetailsSectionProps = {
  data: UserDetails;
};

export function UserDetailsSection({ data }: UserDetailsSectionProps) {
  const ongoingCount = data.ongoingOrders?.length || 0;
  const pastCount = data.pastOrders?.length || 0;
  const totalOrders = ongoingCount + pastCount;

  return (
    <div className="border-b border-gray-200 pb-6">
      <DetailsTable>
        <DetailsRow label="Order Statistics:">
          <FieldsGrid cols={2}>
            <LabeledField
              label="Total Orders"
              value={totalOrders.toString()}
            />
            <LabeledField
              label="Ongoing Orders"
              value={ongoingCount.toString()}
            />
            <LabeledField
              label="Past Orders"
              value={pastCount.toString()}
            />
            <LabeledField
              label="Total Spent"
              value={`€ ${data.totalSpent?.toLocaleString() || "0"}`}
            />
          </FieldsGrid>
        </DetailsRow>
      </DetailsTable>
    </div>
  );
}
