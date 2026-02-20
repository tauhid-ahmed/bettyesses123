/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createPromoCodeSchema, CreatePromoCodeSchema } from "@/features/admin/promo-codes/schemas";
import { createPromoCode } from "@/features/admin/promo-codes/actions/create-promo-code";

export default function CreatePromoCodeForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showUseLimitDropdown, setShowUseLimitDropdown] = useState(false);

  const form = useForm<CreatePromoCodeSchema>({
    resolver: zodResolver(createPromoCodeSchema) as any,
    defaultValues: {
      code: "",
      discountPercentage: 0,
      minOrderAmount: 0,
      startTime: "",
      endTime: "",
      useLimit: "1 Time",
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
        isActive: true,
      };

      const result = await createPromoCode(payload);

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
        Create New Promo Codes
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Create Code
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
            {isPending ? "Creating..." : "Send To"}
          </button>
        </div>
      </form>
    </div>
  );
}
