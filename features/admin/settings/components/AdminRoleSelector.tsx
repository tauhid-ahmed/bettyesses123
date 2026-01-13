"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeUserRole } from "../../users/actions/change-role";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AdminRoleSelectorProps = {
  adminId: string;
  currentRole: string;
};

export function AdminRoleSelector({
  adminId,
  currentRole,
}: AdminRoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<string>(currentRole);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const prevRoleRef = useRef(currentRole);
  const isInternalUpdateRef = useRef(false);

  useEffect(() => {
    if (prevRoleRef.current !== currentRole && !isInternalUpdateRef.current) {
        setSelectedRole(currentRole);
    } else if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
    }
    prevRoleRef.current = currentRole;
  }, [currentRole]);

  const handleRoleChange = (newRole: string) => {
    if (newRole === currentRole || isPending) {
      return;
    }

    isInternalUpdateRef.current = true;
    setSelectedRole(newRole);
    startTransition(async () => {
      const result = await changeUserRole(adminId, { role: newRole as any });
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
        setSelectedRole(currentRole);
        isInternalUpdateRef.current = false;
      }
    });
  };

  return (
    <Select
      value={selectedRole}
      onValueChange={handleRoleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px] bg-[#00244A] text-white border-none h-9">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">USER</SelectItem>
        <SelectItem value="ADMIN">ADMIN</SelectItem>
        <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
      </SelectContent>
    </Select>
  );
}
