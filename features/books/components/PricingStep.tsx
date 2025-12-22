import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { Pricing, pricingSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CURRENCIES } from "../constant";

export default function PricingStep() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pricing>({
    resolver: zodResolver(pricingSchema),
    defaultValues: state.pricing,
  });

  const onSubmit = (data: Pricing) => {
    dispatch({ type: "UPDATE_PRICING", payload: data });
    alert("Book creation completed! All data saved.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pricing</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Currency *</label>
          <select
            {...register("currency")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Offer Price (Optional)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("offerPrice", {
              setValueAs: (v) =>
                v === "" || v === null ? null : parseFloat(v),
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Leave empty for no discount"
          />
          {errors.offerPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.offerPrice.message}
            </p>
          )}
          {state.pricing.offerPrice !== null && (
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR_OFFER_PRICE" })}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Clear offer price
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {canGoPrev && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Complete Book Creation
          </button>
        </div>
      </form>
    </div>
  );
}
