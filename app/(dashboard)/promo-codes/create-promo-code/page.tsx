"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CreatePromoCodeForm() {
  const [formData, setFormData] = useState({
    code: "NEW10",
    discount: "20%",
    useLimit: "1 Time",
    minOrderAmount: "$100",
    startTime: "21-10-2000",
    endTime: "21-10-2000",
  });

  const [showUseLimitDropdown, setShowUseLimitDropdown] = useState(false);

  const useLimitOptions = [
    "1 Time",
    "2 Times",
    "5 Times",
    "10 Times",
    "Unlimited",
  ];

  interface FormData {
    code: string;
    discount: string;
    useLimit: string;
    minOrderAmount: string;
    startTime: string;
    endTime: string;
  }

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    toast.success("Promo code created successfully.");
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className=" bg-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Create New Promo Codes
      </h1>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Create Code
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => handleInputChange("code", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter promo code"
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Discount percentage
          </label>
          <input
            type="text"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter discount percentage"
          />
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
              <span>{formData.useLimit}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            {showUseLimitDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                {useLimitOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      handleInputChange("useLimit", option);
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
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Minimum Order Amount
          </label>
          <input
            type="text"
            value={formData.minOrderAmount}
            onChange={(e) =>
              handleInputChange("minOrderAmount", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="Enter minimum order amount"
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Start Time
          </label>
          <input
            type="text"
            value={formData.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="DD-MM-YYYY"
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            End Time
          </label>
          <input
            type="text"
            value={formData.endTime}
            onChange={(e) => handleInputChange("endTime", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
            placeholder="DD-MM-YYYY"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/promo-codes"
            className="flex-1 px-6 py-3 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-center text-gray-900 font-medium"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#73B7FF] hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            Send To
          </button>
        </div>
      </div>
    </div>
  );
}
