"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SuspendUserDialog } from "./SuspendUserDialog";

type SuspendUserButtonProps = {
  userId: string;
  suspendedUntil: string | null;
};

export function SuspendUserButton({ userId, suspendedUntil }: SuspendUserButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  // Check if user is currently suspended
  const isSuspended = suspendedUntil && new Date(suspendedUntil) > new Date();

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className={`px-6 py-2 rounded-md transition-colors font-normal ${
          isSuspended
            ? "bg-gray-500 hover:bg-gray-600 text-white"
            : "bg-[#E63946] hover:bg-[#d32f2f] text-white"
        }`}
      >
        {isSuspended ? "Suspended" : "Suspend User"}
      </Button>

      <SuspendUserDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        userId={userId}
      />
    </>
  );
}
