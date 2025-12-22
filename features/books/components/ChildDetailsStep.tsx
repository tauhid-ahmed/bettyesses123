import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChildDetails, childDetailsSchema } from "../schema";
import { GENDERS, LANGUAGES } from "../constant";

export default function ChildDetailsStep() {
  const { state, dispatch } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChildDetails>({
    resolver: zodResolver(childDetailsSchema),
    defaultValues: state.childDetails,
  });

  const onSubmit = (data: ChildDetails) => {
    dispatch({ type: "UPDATE_CHILD_DETAILS", payload: data });
    dispatch({ type: "CLEAR_ERRORS" });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        dispatch({ type: "UPLOAD_CHILD_IMAGE", payload: base64 });
        setValue("image", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Child Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter child's name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Birth Month *
          </label>
          <input
            type="month"
            {...register("birthMonth")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthMonth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthMonth.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Child's Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {state.childDetails.image && (
            <div className="mt-2 relative inline-block">
              <img
                src={state.childDetails.image}
                alt="Child"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "REMOVE_CHILD_IMAGE" });
                  setValue("image", null);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language *</label>
          <select
            {...register("language")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Next Step
        </button>
      </form>
    </div>
  );
}
