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
import { Upload } from "lucide-react";

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
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Child Details Section */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-6">
          Select details of your child for the story book!
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Child's Name
            </label>
            <Input
              {...register("name")}
              className="w-full bg-white border-gray-200"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Gender
            </label>
            <Select
              onValueChange={(value) => setValue("gender", value as Gender)}
              value={selectedGender}
            >
              <SelectTrigger className="bg-white w-full border-gray-200">
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
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Select The Birth Month Of The Child
            </label>
            <Select
              onValueChange={(value) => setValue("birthMonth", value)}
              value={selectedBirthMonth}
            >
              <SelectTrigger className="bg-white w-full border-gray-200">
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
              <p className="text-red-500 text-xs mt-1">
                {errors.birthMonth.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Photo Section */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-4">
          Upload your child's photo here!
        </h2>

        <div className="flex justify-center gap-3 mb-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                alt={`Sample ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          Upload a photo of your child
        </p>

        <div className="flex justify-center">
          <label htmlFor="photo-upload">
            <Button
              type="button"
              variant="outline"
              className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-full"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          PNG, JPG up to 10MB
        </p>
      </div>

      {/* Uploaded Photo Display */}
      {state.childDetails.image && (
        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-center mb-4">
            Uploaded photo of your child
          </h2>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={state.childDetails.image}
                alt="Child"
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "REMOVE_CHILD_IMAGE" });
                  setValue("image", null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow-md"
              >
                ×
              </button>
            </div>
          </div>

          <p className="text-sm text-green-600 text-center">
            Picture has been uploaded
          </p>
        </div>
      )}

      {/* Language Selection */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-4">
          Select the language for the story!
        </h2>

        <div className="flex justify-center gap-4">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setValue("language", lang as Language)}
              className={`px-6 py-2 rounded-full border-2 transition-all ${
                selectedLanguage === lang
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        {errors.language && (
          <p className="text-red-500 text-xs mt-2 text-center">
            {errors.language.message}
          </p>
        )}
      </div>

      {/* Story Idea Section */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-4">
          Share your story idea, dream or adventure, and we'll take care of the
          rest!
        </h2>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Tell me your story idea...
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Enter your story idea here..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button
          type="button"
          variant="outline"
          className="border-2 border-red-300 text-red-500 hover:bg-red-50 rounded-full px-6"
        >
          Back To Previous Page
        </Button>

        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8"
        >
          Create My Story
        </Button>
      </div>
    </div>
  );
}
