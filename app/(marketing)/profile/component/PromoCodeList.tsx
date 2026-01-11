'use client';

import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import type { PromoCode } from "@/features/admin/promo-codes/types";

interface PromoCodeListProps {
  codes: PromoCode[];
}

export default function PromoCodeList({ codes }: PromoCodeListProps) {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Promo code copied!");
  };

  const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
  };

  return (
    <section className="bg-[#F4F7FF] py-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Promo Codes</h2>
      <div className="flex flex-wrap gap-4">
        {codes.map((promo) => (
          <div key={promo.id} className="flex items-center gap-4 w-[420px] rounded-2xl border p-4 bg-white">
            <div className="w-24 h-24 bg-[#C77DFF] flex items-center justify-center rounded-xl">
              <span className="text-white font-semibold">{promo.discountPercentage}%</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{promo.code}</p>
              <p className="text-sm text-gray-500">Orders over €{promo.minOrderAmount}</p>
              <p className="text-sm text-gray-500">Expires: {formatDate(promo.endTime)}</p>
              <button onClick={() => handleCopy(promo.code)} className="mt-2 flex items-center gap-2 px-4 py-1 bg-[#7B8CFF] text-white rounded-lg">
                <Copy size={16} /> Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
