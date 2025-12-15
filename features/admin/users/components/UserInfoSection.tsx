import { UserDetails } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
  FieldsGrid,
} from "@/components/DetailsTable";

type UserInfoSectionProps = {
  data: UserDetails;
};

export function UserInfoSection({ data }: UserInfoSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <DetailsTable>
        {/* Service Provider Name */}
        <DetailsRow label="Service Provider Name:">
          <LabeledField label="" value={data.serviceProviderName} />
        </DetailsRow>

        {/* Phone Number */}
        <DetailsRow label="Phone Number:">
          <LabeledField label="" value={data.phoneNumber} />
        </DetailsRow>

        {/* Email */}
        <DetailsRow label="Email:">
          <LabeledField label="" value={data.email} />
        </DetailsRow>

        {/* Location */}
        <DetailsRow label="Location:">
          <div className="space-y-3">
            <FieldsGrid cols={2}>
              <LabeledField label="Address" value={data.location.address} />
              <LabeledField label="City" value={data.location.city} />
            </FieldsGrid>
            <LabeledField label="Zipcode" value={data.location.zipcode} />
          </div>
        </DetailsRow>
      </DetailsTable>
    </div>
  );
}
