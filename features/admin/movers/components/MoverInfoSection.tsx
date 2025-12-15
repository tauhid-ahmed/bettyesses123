import { MoverDetails } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";

type MoverInfoSectionProps = {
  data: MoverDetails;
};

export function MoverInfoSection({ data }: MoverInfoSectionProps) {
  return (
    <DetailsTable>
      {/* Service Provider Name */}
      <DetailsRow label="Service provider name:">
        <LabeledField label="" value={data.serviceProviderName} />
      </DetailsRow>

      {/* Phone Number */}
      <DetailsRow label="Phone number:">
        <LabeledField label="" value={data.phoneNumber} />
      </DetailsRow>

      {/* Email */}
      <DetailsRow label="Email:">
        <LabeledField label="" value={data.email} />
      </DetailsRow>

      {/* Location */}
      <DetailsRow label="Location:" className="border-b-0">
        <div className="space-y-3">
          <FieldsGrid cols={2}>
            <LabeledField label="Address" value={data.location.address} />
            <LabeledField label="City" value={data.location.city} />
          </FieldsGrid>
          <LabeledField label="Zipcode" value={data.location.zipcode} />
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
