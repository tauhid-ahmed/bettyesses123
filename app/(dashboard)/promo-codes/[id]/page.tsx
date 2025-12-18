/* eslint-disable react-hooks/immutability */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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

    // Update promoCodes array if you want to simulate saving
    const index = promoCodes.findIndex((p) => p.id === id);
    if (index !== -1) {
      promoCodes[index] = { id, ...data };
    }
  };

  if (!promo) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Promo Code</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Promo Code"
              className="w-full p-3 border rounded"
            />
          )}
        />

        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Discount"
              className="w-full p-3 border rounded"
            />
          )}
        />

        <Controller
          name="minOrder"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Minimum Order"
              className="w-full p-3 border rounded"
            />
          )}
        />

        <Controller
          name="hoursLeft"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Hours Left"
              className="w-full p-3 border rounded"
            />
          )}
        />

        <Controller
          name="minutesLeft"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Minutes Left"
              className="w-full p-3 border rounded"
            />
          )}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded w-full mt-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
