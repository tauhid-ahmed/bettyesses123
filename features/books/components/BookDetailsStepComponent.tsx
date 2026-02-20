/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Book name is required"),
  description: z.string().min(1, "Description is required"),
  pages: z.coerce.number().min(1, "Pages must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discount: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function BookDetailsStepComponent() {
  const { state, dispatch } = useBookForm();
  const router = useRouter();

  const defaultDiscount =
    state.pricing.offerPrice && state.pricing.price
      ? Math.round(
        (1 - state.pricing.offerPrice / state.pricing.price) * 100
      ).toString()
      : "0";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: state.bookDetails.name,
      description: state.bookDetails.description,
      pages: state.bookDetails.pages,
      price: state.pricing.price,
      discount: defaultDiscount,
    },
  });

  const selectedDiscount = watch("discount");

  const onSubmit = (data: FormValues) => {
    dispatch({
      type: "UPDATE_BOOK_DETAILS",
      payload: {
        name: data.name,
        description: data.description,
        pages: data.pages,
      },
    });

    const discount = parseInt(data.discount);
    const offerPrice =
      discount === 0
        ? null
        : parseFloat((data.price * (1 - discount / 100)).toFixed(2));

    dispatch({
      type: "UPDATE_PRICING",
      payload: {
        price: data.price,
        offerPrice: offerPrice,
      },
    });

    // Proceed to next step or finish
    dispatch({ type: "NEXT_STEP" });
    router.push("/dashboard/books");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Book Details Section */}
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          AI generated book details
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Book name
            </label>
            <Input
              {...register("name")}
              className="bg-white border-gray-200 h-11"
              placeholder="Book Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Short book description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-3 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              placeholder="Book Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Book Page
            </label>
            <Input
              type="number"
              {...register("pages")}
              className="bg-white border-gray-200 h-11"
              placeholder="Pages"
            />
            {errors.pages && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pages.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Book Price Section */}
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Set the book price
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Set the price for the book
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                type="number"
                step="0.01"
                {...register("price")}
                className="bg-white border-gray-200 h-11 pl-7"
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Set offer (If you want)
            </label>
            <Select
              onValueChange={(value) => setValue("discount", value)}
              value={selectedDiscount}
            >
              <SelectTrigger className="bg-white border-gray-200 h-11">
                <SelectValue placeholder="Select discount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 px-6 h-11 rounded-lg gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Previous Page
        </Button>

        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-11 rounded-lg shadow-lg shadow-blue-200"
        >
          Publish Book
        </Button>
      </div>
    </div>
  );
}
