import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChildDetails, childDetailsSchema } from "../schema";
import { GENDERS, LANGUAGES } from "../constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender, Language } from "../types";

const ages = Array.from({ length: 13 }, (_, i) => i + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ChildDetailsStep() {
  const { state, dispatch } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChildDetails>({
    resolver: zodResolver(childDetailsSchema),
    defaultValues: state.childDetails,
  });

  const selectedAge = watch("age");
  const selectedGender = watch("gender");
  const selectedBirthMonth = watch("birthMonth");
  const selectedLanguage = watch("language");

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
      <p className="text-gray-600 mb-6">
        The book will be personalized with the information you provide
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Child's Name *
          </label>
          <Input
            {...register("name")}
            className="w-full bg-white"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <Select
            onValueChange={(value) => setValue("age", Number(value))}
            value={selectedAge?.toString()}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              {ages.map((age) => (
                <SelectItem key={age} value={age.toString()}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <Select
            onValueChange={(value) => setValue("gender", value as Gender)}
            value={selectedGender}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Select The Birth Month Of The Child *
          </label>
          <Select
            onValueChange={(value) => setValue("birthMonth", value)}
            value={selectedBirthMonth}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month.toLowerCase()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Select
            onValueChange={(value) => setValue("language", value as Language)}
            value={selectedLanguage}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Go To Next Step → Upload photo
        </Button>
      </div>
    </div>
  );
}
