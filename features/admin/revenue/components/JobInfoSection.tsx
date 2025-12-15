import { RevenueDetails } from "../types";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
} from "@/components/DetailsTable";

type JobInfoSectionProps = {
  data: RevenueDetails;
};

export function JobInfoSection({ data }: JobInfoSectionProps) {
  return (
    <div className="space-y-4">
      <DetailsTable>
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
