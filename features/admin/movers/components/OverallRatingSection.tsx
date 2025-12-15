"use client";

import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { updateTopRatedStatus } from "../actions/update-top-rated";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DetailsTable,
  DetailsRow,
  LabeledField,
} from "@/components/DetailsTable";

type OverallRatingSectionProps = {
  rating: number;
  isTopRated: boolean;
  moverId: string;
};

export function OverallRatingSection({
  rating,
  isTopRated,
  moverId,
}: OverallRatingSectionProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (checked: boolean) => {
    startTransition(async () => {
      const result = await updateTopRatedStatus(moverId, checked);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <DetailsTable className="border-t pt-4">
      {/* Overall Rating */}
      <DetailsRow label="Overall Rating:">
        <div className="max-w-[200px]">
          <LabeledField label="" value={`${rating} Star`} />
        </div>
      </DetailsRow>

      {/* Top Provider Toggle */}
      <DetailsRow
        label="Make The service provider a top provider:"
        className="border-b-0"
      >
        <div className="flex items-center gap-3">
          <Switch
            checked={isTopRated}
            onCheckedChange={handleToggle}
            disabled={isPending}
            className="data-[state=checked]:bg-success-500"
          />
        </div>
      </DetailsRow>
    </DetailsTable>
  );
}
