import { OrderInfo } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";

type OrderInfoSectionProps = {
  data: OrderInfo;
};

export function OrderInfoSection({ data }: OrderInfoSectionProps) {
  return (
    <DetailsTable className="border-t pt-4">
      <DetailsRow label="Order Info:">
        <FieldsGrid cols={2}>
          <LabeledField label="Service Price" value={`$${data.servicePrice}`} />
          <LabeledField label="Service Name" value={data.serviceName} />
          <LabeledField
            label="Service Provider revenue"
            value={`$${data.serviceProviderRevenue.toFixed(1)}`}
          />
          <LabeledField
            label="Admin revenue"
            value={`$${data.adminRevenue.toFixed(2)}`}
          />
          <LabeledField label="Address" value={data.address} />
          <LabeledField label="Date And Time" value={data.dateAndTime} />
        </FieldsGrid>
      </DetailsRow>
    </DetailsTable>
  );
}
