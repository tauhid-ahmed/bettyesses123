"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
import { suspendMover } from "../actions/suspend-mover";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

type SuspendMoverDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moverId: string;
};

export function SuspendMoverDialog({
  open,
  onOpenChange,
  moverId,
}: SuspendMoverDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSuspend = () => {
    startTransition(async () => {
      const result = await suspendMover(moverId);
      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
        router.push("/admin/movers");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-danger-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-base font-semibold">
            Are you sure you want to suspend this Mover?
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Confirm suspension
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row gap-3 sm:gap-3">
          <AlertDialogCancel
            disabled={isPending}
            className="flex-1 m-0 border-gray-300"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleSuspend}
            disabled={isPending}
            className="flex-1 bg-primary-500 hover:bg-primary-600"
          >
            {isPending ? "Suspending..." : "Suspend"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
