"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { approveProviderRequest } from "../actions/approve-request";
import { cancelProviderRequest } from "../actions/cancel-request";
import { toast } from "sonner";

type ActionButtonsProps = {
  providerId: string;
};

export function ActionButtons({ providerId }: ActionButtonsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelProviderRequest(providerId);
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/providers");
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveProviderRequest(providerId);
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/providers");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
      <Button
        variant="outline"
        onClick={handleCancel}
        disabled={isPending}
        className="border-gray-300 text-gray-700 hover:bg-gray-50 min-w-[140px]"
      >
        Cancel Request
      </Button>
      <Button
        onClick={handleApprove}
        disabled={isPending}
        className="bg-primary-500 hover:bg-primary-600 text-white min-w-[140px]"
      >
        {isPending ? "Approving..." : "Approve Request"}
      </Button>
    </div>
  );
}
