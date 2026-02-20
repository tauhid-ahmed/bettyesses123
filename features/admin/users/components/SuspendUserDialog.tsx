"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { suspendUser } from "../actions/suspend-user";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

type SuspendUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

export function SuspendUserDialog({
  open,
  onOpenChange,
  userId,
}: SuspendUserDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [suspendedUntil, setSuspendedUntil] = useState("");
  const [suspensionNote, setSuspensionNote] = useState("");

  const handleSuspend = () => {
    if (!suspendedUntil) {
      toast.error("Please select a suspension date");
      return;
    }

    if (!suspensionNote) {
      toast.error("Please provide a suspension note");
      return;
    }

    // Convert datetime-local string to ISO string
    // datetime-local format: "YYYY-MM-DDTHH:mm"
    // We need to convert it to ISO format: "YYYY-MM-DDTHH:mm:ss.sssZ"
    const suspendedUntilDate = new Date(suspendedUntil);
    if (isNaN(suspendedUntilDate.getTime())) {
      toast.error("Invalid date selected");
      return;
    }
    const suspendedUntilISO = suspendedUntilDate.toISOString();

    startTransition(async () => {
      const result = await suspendUser(userId, {
        suspendedUntil: suspendedUntilISO,
        suspensionNote,
      });
      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
        setSuspendedUntil("");
        setSuspensionNote("");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleClose = () => {
    setSuspendedUntil("");
    setSuspensionNote("");
    onOpenChange(false);
  };

  // Get tomorrow's date as minimum (ISO format for input)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-danger-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-base font-semibold">
            Suspend User
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-600">
            Please provide suspension details
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="suspendedUntil" className="text-sm font-medium">
              Suspended Until <span className="text-red-500">*</span>
            </Label>
            <Input
              id="suspendedUntil"
              type="datetime-local"
              value={suspendedUntil}
              onChange={(e) => setSuspendedUntil(e.target.value)}
              min={minDate}
              disabled={isPending}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suspensionNote" className="text-sm font-medium">
              Suspension Note <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="suspensionNote"
              value={suspensionNote}
              onChange={(e) => setSuspensionNote(e.target.value)}
              placeholder="Enter reason for suspension..."
              disabled={isPending}
              className="w-full min-h-[100px]"
              required
            />
          </div>
        </div>

        <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
          <AlertDialogCancel
            disabled={isPending}
            onClick={handleClose}
            className="flex-1 m-0 border-gray-300"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleSuspend}
            disabled={isPending || !suspendedUntil || !suspensionNote}
            className="flex-1 bg-[#E63946] hover:bg-[#d32f2f] text-white"
          >
            {isPending ? "Suspending..." : "Suspend User"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
