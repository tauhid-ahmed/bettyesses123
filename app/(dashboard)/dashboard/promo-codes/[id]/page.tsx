/* eslint-disable react-hooks/immutability */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";

type Promo = {
  id: number;
  code: string;
  discount: string;
  minOrder: string;
  hoursLeft: number;
  minutesLeft: number;
};

const promoCodes: Promo[] = [
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
    code: "NEW20",
    discount: "15% off",
    minOrder: "€50",
    hoursLeft: 10,
    minutesLeft: 5,
  },
];

type FormValues = {
  code: string;
  discount: string;
  minOrder: string;
  hoursLeft: number;
  minutesLeft: number;
};

export default function EditPromoCodePage() {
  const params = useParams();
  const id = Number(params.id);

  const [promo, setPromo] = useState<Promo | null>(null);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      code: "",
      discount: "",
      minOrder: "",
      hoursLeft: 0,
      minutesLeft: 0,
    },
  });

  useEffect(() => {
    const found = promoCodes.find((p) => p.id === id);
    if (found) {
      setPromo(found);
      reset({
        code: found.code,
        discount: found.discount,
        minOrder: found.minOrder,
        hoursLeft: found.hoursLeft,
        minutesLeft: found.minutesLeft,
      });
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Saved data:", { id, ...data });

    const index = promoCodes.findIndex((p) => p.id === id);
    if (index !== -1) {
      promoCodes[index] = { id, ...data };
    }
  };

  if (!promo) return <p className="p-6">Loading...</p>;

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Edit Promo Code
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Promo Code
          </label>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter promo code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Discount
          </label>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter discount (e.g., 12% off)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Minimum Order Amount
          </label>
          <Controller
            name="minOrder"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter minimum order amount (e.g., €30)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Hours Left
          </label>
          <Controller
            name="hoursLeft"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Enter hours remaining"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-gray-900 text-base font-normal mb-3">
            Minutes Left
          </label>
          <Controller
            name="minutesLeft"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Enter minutes remaining"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            )}
          />
        </div>

        <div className="pt-4">
          <button

          onClick={() => toast.success("Promo code updated successfully.")}
            type="submit"
            className="w-full px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
