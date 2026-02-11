"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { endSuspension } from "../actions/post-end-suspension";
import { toast } from "sonner";

type Props = {
  userId: string;
};

export default function EndSuspensionButton({ userId }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEnd = () => {
    startTransition(async () => {
      const res = await endSuspension(userId);
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="rounded-md bg-[#10B981] px-4 py-2 text-sm font-medium text-white"
      >
        End Suspension
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-base font-semibold">
              End suspension for this user?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Confirm ending suspension
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
            <AlertDialogCancel disabled={isPending} className="flex-1 m-0">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleEnd}
              disabled={isPending}
              className="flex-1 bg-primary-500 hover:bg-primary-600"
            >
              {isPending ? "Ending..." : "End Suspension"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
