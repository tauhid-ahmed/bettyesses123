"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SuspendMoverDialog } from "./SuspendMoverDialog";

type SuspendMoverButtonProps = {
  moverId: string;
};

export function SuspendMoverButton({ moverId }: SuspendMoverButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="bg-danger-500 hover:bg-danger-600 text-white"
      >
        Suspend Mover
      </Button>

      <SuspendMoverDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        moverId={moverId}
      />
    </>
  );
}
