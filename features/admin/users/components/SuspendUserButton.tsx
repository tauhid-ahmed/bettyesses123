"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SuspendUserDialog } from "./SuspendUserDialog";

type SuspendUserButtonProps = {
  userId: string;
};

export function SuspendUserButton({ userId }: SuspendUserButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="bg-danger-500 hover:bg-danger-600 text-white"
      >
        Suspend User
      </Button>

      <SuspendUserDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        userId={userId}
      />
    </>
  );
}
