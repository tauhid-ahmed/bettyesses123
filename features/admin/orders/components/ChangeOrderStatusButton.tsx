"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "../actions/update-order-status";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChangeOrderStatusButtonProps = {
  orderId: string;
  currentStatus: "COMPLETED" | "CANCELLED" | "PENDING";
};

export function ChangeOrderStatusButton({
  orderId,
  currentStatus,
}: ChangeOrderStatusButtonProps) {
  const [selectedStatus, setSelectedStatus] = useState<"COMPLETED" | "CANCELLED" | "PENDING">(currentStatus);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const prevStatusRef = useRef(currentStatus);
  const isInternalUpdateRef = useRef(false);

  // Sync selectedStatus with currentStatus prop when it changes externally
  // Use a ref callback pattern to avoid setState in effect
  const syncStatusRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    if (prevStatusRef.current !== currentStatus && !isInternalUpdateRef.current) {
      // Schedule state update outside the effect using a callback
      syncStatusRef.current = () => {
        setSelectedStatus(currentStatus);
        prevStatusRef.current = currentStatus;
      };
      // Use queueMicrotask to defer the state update
      queueMicrotask(() => {
        if (syncStatusRef.current) {
          syncStatusRef.current();
          syncStatusRef.current = null;
        }
      });
    } else if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
    }
    prevStatusRef.current = currentStatus;
  }, [currentStatus]);

  const handleStatusChange = (newStatus: "COMPLETED" | "CANCELLED" | "PENDING") => {
    if (newStatus === currentStatus || isPending) {
      return;
    }

    isInternalUpdateRef.current = true;
    setSelectedStatus(newStatus);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, { status: newStatus });
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
        setSelectedStatus(currentStatus);
        isInternalUpdateRef.current = false;
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-dark-800 font-normal text-xl">Status:</span>
      <Select
        value={selectedStatus}
        onValueChange={(value) =>
          handleStatusChange(value as "COMPLETED" | "CANCELLED" | "PENDING")
        }
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px] bg-[#00244A] text-white border-none">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">PENDING</SelectItem>
          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
