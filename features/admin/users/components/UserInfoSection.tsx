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
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  return (
    <div className="border-b border-gray-200 pb-6">
      <DetailsTable>
        {/* User Name */}
        <DetailsRow label="User Name:">
          <LabeledField label="" value={fullName} />
        </DetailsRow>

        {/* Email */}
        <DetailsRow label="Email:">
          <LabeledField label="" value={data.email} />
        </DetailsRow>

        {/* Phone Number */}
        <DetailsRow label="Phone Number:">
          <LabeledField label="" value={data.phoneNumber || "N/A"} />
        </DetailsRow>

        {/* Role */}
        <DetailsRow label="Role:">
          <LabeledField label="" value={data.role} />
        </DetailsRow>

        {/* Status */}
        <DetailsRow label="Status:">
          <LabeledField label="" value={data.status} />
        </DetailsRow>

        {/* Location */}
        {data.location && (
          <DetailsRow label="Location:">
            <div className="space-y-3">
              <FieldsGrid cols={2}>
                <LabeledField label="Address" value={data.location.address} />
                <LabeledField label="City" value={data.location.city} />
              </FieldsGrid>
              <LabeledField label="Zipcode" value={data.location.zipcode} />
            </div>
          </DetailsRow>
        )}

        {/* Suspension Info */}
        {data.suspendedUntil && (
          <DetailsRow label="Suspended Until:">
            <LabeledField
              label=""
              value={new Date(data.suspendedUntil).toLocaleDateString()}
            />
          </DetailsRow>
        )}

        {data.suspensionNote && (
          <DetailsRow label="Suspension Note:">
            <LabeledField label="" value={data.suspensionNote} />
          </DetailsRow>
        )}
      </DetailsTable>
    </div>
  );
}
