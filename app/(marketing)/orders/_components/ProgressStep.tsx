"use client";

import React from "react";

interface ProgressStepProps {
  icon: React.ReactNode;
  label: string;
  step: number;
  currentStep: number;
  isLast?: boolean;
}

export default function ProgressStep({
  icon,
  label,
  step,
  currentStep,
  isLast = false,
}: ProgressStepProps) {
  const isActive = step <= currentStep;

  return (
    <div className="flex flex-col items-center flex-1 relative">
      <div className="text-xs font-semibold text-gray-500 mb-3">
        Step {step}
      </div>

      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-all shadow-lg ${
          isActive
            ? "bg-linear-to-br from-indigo-500 to-purple-600"
            : "bg-gray-200"
        }`}
      >
        <div
          className={`text-3xl ${
            isActive ? "" : "grayscale opacity-50"
          }`}
        >
          {icon}
        </div>
      </div>

      <span
        className={`text-sm font-semibold text-center ${
          isActive ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {label}
      </span>

      {!isLast && (
        <div className="absolute top-14 left-1/2 w-full h-1">
          <div
            className={`h-full ${
              step < currentStep
                ? "bg-linear-to-r from-indigo-500 to-purple-600"
                : "bg-gray-200"
            }`}
          />
        </div>
      )}
    </div>
  );
}
