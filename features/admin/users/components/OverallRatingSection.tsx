"use client";

import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { updateTopRatedStatus } from "../actions/update-top-rated";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <div className="border-b border-gray-200 pb-6">
      <div className="grid md:md:grid-cols-[180px_1fr] gap-x-6 md:gap-y-4 gap-y-2 gap-y-2 md:gap-y-4">
        <label className="text-sm font-medium text-gray-700">
          Overall Rating:
        </label>
        <div className="text-sm text-gray-900 bg-white border border-gray-200 rounded px-3 py-2 max-w-[200px]">
          {rating} Star
        </div>

        <label className="text-sm font-medium text-gray-700">
          Make The service provider a top provider:
        </label>
        <div className="flex items-center gap-3">
          <Switch
            checked={isTopRated}
            onCheckedChange={handleToggle}
            disabled={isPending}
            className="data-[state=checked]:bg-success-500"
          />
        </div>
      </div>
    </div>
  );
}
