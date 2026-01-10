"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPromoCodes } from "@/features/admin/promo-codes/actions/get-promo-codes";
import { deletePromoCode } from "@/features/admin/promo-codes/actions/delete-promo-code";
import { PromoCode } from "@/features/admin/promo-codes/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PromoCodesDashboard() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const result = await getPromoCodes();
        if (result.success && result.data) {
          setPromoCodes(result.data);
        } else {
          toast.error("Failed to load promo codes");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while loading promo codes");
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCodes();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const result = await deletePromoCode(deleteId);
      if (result.success) {
        setPromoCodes((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
        console.error(error)
        toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const calculateTimeLeft = (endTime: string) => {
    const total = Date.parse(endTime) - Date.now();
    const hours = Math.floor((total / (1000 * 60 * 60)));
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, hours, minutes };
  };

  const now = new Date();

  const ongoingCodes = promoCodes.filter((code) => {
    const endTime = new Date(code.endTime);
    return code.isActive && endTime > now;
  });

  const expiredCodes = promoCodes.filter((code) => {
    const endTime = new Date(code.endTime);
    return !code.isActive || endTime <= now;
  });

  if (loading) {
    return <div className="p-6 text-center">Loading promo codes...</div>;
  }

  return (
    <div className=" bg-gray-50 p-4 sm:p-6 md:p-2 lg:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Ongoing Promo Codes
        </h1>
        <Link href={"promo-codes/create-promo-code"}>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#73b7ff] hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            <span>Create New Code</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {ongoingCodes.length === 0 ? (
          <p className="text-gray-500 col-span-2 text-center py-8">
            No ongoing promo codes found.
          </p>
        ) : (
          ongoingCodes.map((promo) => {
             const timeLeft = calculateTimeLeft(promo.endTime);
             return (
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="shrink-0 w-full sm:w-32 h-24 bg-pink-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      {promo.discountPercentage}% off
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Code : <span className="font-semibold">{promo.code}</span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      Orders Over €{promo.minOrderAmount}
                    </p>
                    <p className="text-gray-900 text-sm">
                      {timeLeft.total > 0 ? (
                        <>
                          <span className="font-semibold">{timeLeft.hours} H</span>{" "}
                          <span className="font-semibold">{timeLeft.minutes} Min</span>{" "}
                          Left
                        </>
                      ) : (
                        <span className="text-red-500 font-semibold">Expired</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    href={`/dashboard/promo-codes/${promo.id}`}
                    className="flex-1 bg-[#73b7ff] hover:bg-blue-500 text-white py-3 rounded-lg transition-colors text-center"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(promo.id)}
                    className="flex-1 py-3 rounded-lg transition-colors text-white bg-pink-700 hover:bg-red-600"
                  >
                    Stop This Promo Code
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          Expired Promo Codes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expiredCodes.length === 0 ? (
            <p className="text-gray-500 col-span-2 text-center py-8">
              No expired promo codes found.
            </p>
          ) : (
             expiredCodes.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="shrink-0 w-full sm:w-32 h-24 bg-pink-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      {promo.discountPercentage}% off
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Code : <span className="font-semibold">{promo.code}</span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                       Orders Over €{promo.minOrderAmount}
                    </p>
                    <p className="text-gray-900 text-sm">
                      <span className="text-red-500 font-semibold">Expired</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the promo code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
