"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { isatty } from "tty";

export default function PromoCodesDashboard() {
  const [ongoingCodes] = useState([
    {
      id: 1,
      code: "NEW10",
      discount: "12% off",
      minOrder: "€30",
      hoursLeft: 30,
      minutesLeft: 25,
    },
    {
      id: 2,
      code: "NEW10",
      discount: "12% off",
      minOrder: "€30",
      hoursLeft: 30,
      minutesLeft: 25,
    },
  ]);

  const [expiredCodes] = useState([
    {
      id: 1,
      code: "NEW10",
      discount: "12% off",
      minOrder: "€30",
      hoursLeft: 30,
      minutesLeft: 25,
    },
    {
      id: 2,
      code: "NEW10",
      discount: "12% off",
      minOrder: "€30",
      hoursLeft: 30,
      minutesLeft: 25,
    },
  ]);

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
        {ongoingCodes.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="shrink-0 w-full sm:w-32 h-24 bg-pink-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  {promo.discount}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Code : <span className="font-semibold">{promo.code}</span>
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Orders Over {promo.minOrder}
                </p>
                <p className="text-gray-900 text-sm">
                  <span className="font-semibold">{promo.hoursLeft} H</span>{" "}
                  <span className="font-semibold">{promo.minutesLeft} Min</span>{" "}
                  Left
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href={`/promo-codes/${promo.id}`}
                className="flex-1 bg-[#73b7ff] hover:bg-blue-500 text-white py-3 rounded-lg transition-colors text-center"
              >
                Edit
              </Link>

              <DisablePromoCode />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          Expired Promo Codes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expiredCodes.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="shrink-0 w-full sm:w-32 h-24 bg-pink-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">
                    {promo.discount}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Code : <span className="font-semibold">{promo.code}</span>
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Orders Over {promo.minOrder}
                  </p>
                  <p className="text-gray-900 text-sm">
                    <span className="font-semibold">{promo.hoursLeft} H</span>{" "}
                    <span className="font-semibold">
                      {promo.minutesLeft} Min
                    </span>{" "}
                    Left
                  </p>
                </div>
              </div>

              <button
                onClick={() => toast.success("Sending promo code")}
                className="w-full bg-[#73b7ff] hover:bg-blue-500 text-white py-3 rounded-lg mt-6 transition-colors"
              >
                Send This Promo Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DisablePromoCode() {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <button
      disabled={isDisabled}
      onClick={() => setIsDisabled((isDisabled) => !isDisabled)}
      className="flex-1 bg-pink-700 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
    >
      Stop This Promo Code
    </button>
  );
}
