import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChildDetails, childDetailsSchema } from "../schema";
import { GENDERS } from "../constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "../types";
import { Upload, Sparkles } from "lucide-react";
import Image from "next/image";
import imageGuide1 from "@/images/imageGuide1.webp";
import imageGuide2 from "@/images/imageGuide2.webp";

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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
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

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Age
            </label>
            <Select
              onValueChange={(value) => setValue("age", Number(value))}
              value={selectedAge?.toString()}
            >
              <SelectTrigger className="bg-white w-full border-gray-200">
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
              <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
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
        <h2 className="text-[#1F2937] text-[38px] font-semibold text-center mb-4">
          Upload your child's photo here!
        </h2>

        <div className="text-xs text-center text-gray-500 mb-4">
          Reference images showing which photos are allowed and which are
          not
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-4 mb-4">
            {[...Array(2)].map((_, i) => {
              if (i === 0) {
                return (
                  <div
                    key={i}
                    className="flex gap-2 md:gap-4 rounded-full overflow-hidden"
                  >
                    <Image
                      src={imageGuide1}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                    <Image
                      src={imageGuide1}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                    <Image
                      src={imageGuide1}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                  </div>
                );
              }
              if (i === 1) {
                return (
                  <div
                    key={i}
                    className="flex gap-2 md:gap-4 overflow-hidden"
                  >
                    <Image
                      src={imageGuide2}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                    <Image
                      src={imageGuide2}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                    <Image
                      src={imageGuide2}
                      alt={`Image Guide ${i + 1}`}
                      width={50}
                      height={50}
                      className="size-6 sm:size-10 md:size-14 object-cover"
                    />
                  </div>
                );
              }
            })}
          </div>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Upload a photo of your child
          </p>
          <label htmlFor="image-upload">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer font-bold border-primary-500 py-6 px-6! text-primary-500 bg-transparent hover:bg-primary-500 hover:text-white"
              asChild
            >
              <span>
                <Upload className="size-4!" />
                Upload Image
              </span>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <p className="text-xs text-gray-500 mt-2">PNG JPG, up to 10MB</p>
        </div>


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


      {/* Story Idea Section */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-center mb-4">
          Share your story idea, dream or adventure, and we'll take care of the
          rest!
        </h2>

        <div className="w-full">
          <label className="block text-base font-medium mb-3 text-gray-900">
            Write your story idea
          </label>
          <div className="relative group">
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none transition-colors group-hover:text-blue-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <textarea
              className="w-full pl-12 pr-4 py-4 rounded-xl border bg-white  transition-all duration-200 resize-none min-h-[140px] placeholder:text-gray-400"
              placeholder="Prompt......"
            />
          </div>
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
