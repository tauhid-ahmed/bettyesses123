"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createPromoCodeSchema, CreatePromoCodeSchema } from "@/features/admin/promo-codes/schemas";
import { updatePromoCode } from "@/features/admin/promo-codes/actions/update-promo-code";
import { PromoCode } from "@/features/admin/promo-codes/types";

type EditPromoCodeFormProps = {
  initialData: PromoCode;
};

export default function EditPromoCodeForm({ initialData }: EditPromoCodeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showUseLimitDropdown, setShowUseLimitDropdown] = useState(false);

  // Format initial dates to YYYY-MM-DD for input[type="date"]
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : "";
  };
  
  // Map initial use limit to string
  const getUseLimitString = (limit: number) => {
    if (limit >= 10000) return "Unlimited";
    return `${limit} Time${limit > 1 ? "s" : ""}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(createPromoCodeSchema),
    defaultValues: {
      code: initialData.code,
      discountPercentage: initialData.discountPercentage,
      minOrderAmount: initialData.minOrderAmount,
      startTime: formatDate(initialData.startTime),
      endTime: formatDate(initialData.endTime),
      useLimit: getUseLimitString(initialData.perPersonUseLimit),
    },
  });

  const useLimitOptions = [
    "1 Time",
    "2 Times",
    "5 Times",
    "10 Times",
    "Unlimited",
  ];

  const onSubmit = (data: CreatePromoCodeSchema) => {
    startTransition(async () => {
      // Map Use Limit string to number
      let limit = 1;
      if (data.useLimit === "Unlimited") {
        limit = 1000000;
      } else {
        const match = data.useLimit.match(/(\d+)/);
        if (match) {
          limit = parseInt(match[0], 10);
        }
      }

      const startDate = new Date(data.startTime);
      const endDate = new Date(data.endTime);
      
      const payload = {
        code: data.code,
        discountPercentage: Number(data.discountPercentage),
        minOrderAmount: Number(data.minOrderAmount),
        perPersonUseLimit: limit,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        isActive: initialData.isActive, // Keep existing status or allow toggle? Usually edit allows changing values, status might be separate or here. Keeping existing for now.
      };

      const result = await updatePromoCode(initialData.id, payload);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard/promo-codes");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className=" bg-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Edit Promo Code
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Promo Code
          </label>
          <input
            {...form.register("code")}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter promo code"
          />
          {form.formState.errors.code && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Discount percentage
          </label>
          <input
            {...form.register("discountPercentage")}
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter discount percentage"
          />
           {form.formState.errors.discountPercentage && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.discountPercentage.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Use Limit
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUseLimitDropdown(!showUseLimitDropdown)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 text-left flex justify-between items-center bg-white"
            >
              <span>{form.watch("useLimit")}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            {showUseLimitDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                {useLimitOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      form.setValue("useLimit", option);
                      setShowUseLimitDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
           {form.formState.errors.useLimit && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.useLimit.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Minimum Order Amount
          </label>
          <input
            {...form.register("minOrderAmount")}
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter minimum order amount"
          />
           {form.formState.errors.minOrderAmount && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.minOrderAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Start Time
          </label>
          <input
            {...form.register("startTime")}
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
          />
           {form.formState.errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            End Time
          </label>
          <input
             {...form.register("endTime")}
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
          />
           {form.formState.errors.endTime && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.endTime.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="flex-1 px-6 py-3 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-center text-gray-900 font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-6 py-3 bg-[#73B7FF] hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
