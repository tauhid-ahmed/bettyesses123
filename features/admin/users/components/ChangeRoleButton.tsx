"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeUserRole } from "../actions/change-role";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChangeRoleButtonProps = {
  userId: string;
  currentRole: "ADMIN" | "USER" | "SUPERADMIN";
};

export function ChangeRoleButton({
  userId,
  currentRole,
}: ChangeRoleButtonProps) {
  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "USER" | "SUPERADMIN">(currentRole);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const prevRoleRef = useRef(currentRole);
  const isInternalUpdateRef = useRef(false);

  // Sync selectedRole with currentRole prop when it changes externally (not from our own updates)
  useEffect(() => {
    if (prevRoleRef.current !== currentRole && !isInternalUpdateRef.current) {
      // External change (e.g., from router.refresh after successful API call)
      setSelectedRole(currentRole);
      prevRoleRef.current = currentRole;
    } else if (isInternalUpdateRef.current) {
      // Reset flag after internal update
      isInternalUpdateRef.current = false;
    }
    prevRoleRef.current = currentRole;
  }, [currentRole]);

  const handleRoleChange = (newRole: "ADMIN" | "USER" | "SUPERADMIN") => {
    if (newRole === currentRole || isPending) {
      return;
    }

    isInternalUpdateRef.current = true;
    setSelectedRole(newRole);
    startTransition(async () => {
      const result = await changeUserRole(userId, { role: newRole });
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
        // Revert to currentRole on error
        setSelectedRole(currentRole);
        isInternalUpdateRef.current = false;
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-dark-800 font-normal text-xl">Change Role:</span>
      <Select
        value={selectedRole}
        onValueChange={(value) =>
          handleRoleChange(value as "ADMIN" | "USER" | "SUPERADMIN")
        }
        disabled={isPending}
      >
        <SelectTrigger className="w-[140px] bg-[#00244A] text-white border-none">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">USER</SelectItem>
          <SelectItem value="ADMIN">ADMIN</SelectItem>
          <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
