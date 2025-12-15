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
        <div className="space-y-4">
          <FieldsGrid cols={2}>
            <LabeledField
              label="Service Price"
              value={`$${data.servicePrice}`}
            />
            <LabeledField label="Service Name" value={data.serviceName} />
          </FieldsGrid>

          <FieldsGrid cols={2}>
            <LabeledField label="Address" value={data.address} />
            <LabeledField label="Date And Time" value={data.dateAndTime} />
          </FieldsGrid>

          <div className="max-w-[calc(50%-0.5rem)]">
            <LabeledField
              label="Order Canceled by"
              value={data.orderCanceledBy}
            />
          </div>
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
