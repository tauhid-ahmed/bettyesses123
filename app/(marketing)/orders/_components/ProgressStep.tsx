"use client";

import React from "react";
import { Package, Gift, Truck } from "lucide-react";
import { OrderStatus } from "./OrderList";

interface OrderStepperProps {
  status: OrderStatus;
}

const stepMap: Record<OrderStatus, number> = {
  PENDING: 1,
  ORDER_PROCESSED: 1,
  ORDER_SHIPPED: 2,
  ORDER_EN_ROUTE: 3,
  ORDER_ARRIVED: 4,
  COMPLETED: 4,
  PAYMENT_FAILED: 0,
  CANCELLED: 0,
};

const steps = [
  { label: "Step 1", title: "Order Processed", icon: <Package className="w-8 h-8 text-[#C77DFF]" /> },
  { label: "Step 2", title: "Order Shipped", icon: <Gift className="w-8 h-8 text-[#8B7BFF]" /> },
  { label: "Step 3", title: "Order En Route", icon: <Truck className="w-8 h-8 text-[#61C2FF]" /> },
  { label: "Step 4", title: "Order Arrived", icon: <Truck className="w-8 h-8 text-[#FF9F1C]" /> },
];

export default function OrderStepper({ status }: OrderStepperProps) {
  const currentStep = stepMap[status] ?? 0;
  const isErrorStatus = status === "PAYMENT_FAILED" || status === "CANCELLED";

  if (isErrorStatus) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-red-600 font-bold text-xl text-center">
        This order has been {status === "CANCELLED" ? "Cancelled" : "marked with Payment Failed"}.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-between relative px-4 md:px-12">
      {steps.map((s, index) => {
        const stepNum = index + 1;
        const isActive = stepNum <= currentStep;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative z-10 min-w-[150px]">
            {/* Step Label */}
            <span className="mb-4 text-gray-600 font-medium">{s.label}</span>

            {/* Bar */}
            <div
              className={`w-full h-2.5 rounded-full mb-6 ${
                isActive ? "bg-gradient-to-r from-[#7B8CFF] to-[#C77DFF]" : "bg-white"
              }`}
            ></div>

            {/* Icon */}
            <div className="mb-2">{s.icon}</div>

            {/* Title */}
            <span className="text-gray-700 font-medium">{s.title}</span>
          </div>
        );
      })}
    </div>
  );
}
