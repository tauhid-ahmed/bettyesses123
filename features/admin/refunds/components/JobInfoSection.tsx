import { RefundDetails } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
} from "@/components/DetailsTable";

type JobInfoSectionProps = {
  data: RefundDetails;
};

export function JobInfoSection({ data }: JobInfoSectionProps) {
  return (
    <div className="space-y-6">
      <DetailsTable className="divide-y pt-4">
        {/* Job Poster Name */}
        <DetailsRow label="Job Poster Name:">
          <LabeledField label="" value={data.jobPosterName} />
        </DetailsRow>

        {/* Service Provider Name */}
        <DetailsRow label="Service Provider Name:">
          <LabeledField label="" value={data.serviceProviderName} />
        </DetailsRow>
      </DetailsTable>
    </div>
  );
}
