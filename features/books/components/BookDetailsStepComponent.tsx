import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { BookDetails, bookDetailsSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BookDetailsStepComponent() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookDetails>({
    resolver: zodResolver(bookDetailsSchema),
    defaultValues: state.bookDetails,
  });

  const onSubmit = (data: BookDetails) => {
    dispatch({ type: "UPDATE_BOOK_DETAILS", payload: data });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Book Name *</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your book..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Pages *
          </label>
          <input
            type="number"
            {...register("pages", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.pages && (
            <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre *</label>
          <input
            {...register("genre")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Adventure, Fantasy, Educational"
          />
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
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
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
