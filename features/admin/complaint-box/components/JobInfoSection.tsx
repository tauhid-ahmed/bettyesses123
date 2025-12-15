import { ServiceDetails } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
} from "@/components/DetailsTable";

type JobInfoSectionProps = {
  data: ServiceDetails;
};

export function JobInfoSection({ data }: JobInfoSectionProps) {
  return (
    <DetailsTable className="border-t pt-4">
      {/* Job Poster Name */}
      <DetailsRow label="Job poster name:">
        <LabeledField label="" value={data.jobPosterName} />
      </DetailsRow>

      {/* Service Provider Name */}
      <DetailsRow label="Service provider name:">
        <LabeledField label="" value={data.serviceProviderName} />
      </DetailsRow>
    </DetailsTable>
  );
}
