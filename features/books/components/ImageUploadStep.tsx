"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePersonalizeBook } from "../context/PersonalizeBookContext";
import Section from "@/components/Section";
import imageGuide1 from "@/images/imageGuide1.webp";
import imageGuide2 from "@/images/imageGuide2.webp";

export default function ImageUploadStep() {
  const { uploadedImage, setUploadedImage, updateFormData, setCurrentStep } =
    usePersonalizeBook();
  const [preview, setPreview] = useState<string | null>(uploadedImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setUploadedImage(result);
        updateFormData({ image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setUploadedImage(null);
    updateFormData({ image: undefined });
  };

  const handleContinue = () => {
    setCurrentStep(3);
  };

  return (
    <Section
      title="Upload Your Child’s Photo"
      description="Upload your child’s photo that you want in the book"
      padding="sm"
    >
      <div className="mt-6">
        {!preview ? (
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50/50">
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
        ) : (
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 bg-purple-50/50">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg">
                  <Image
                    src={preview}
                    alt="Uploaded child photo"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-purple-600 font-medium mt-4">
                The image looks perfect
              </p>

              <Button
                type="submit"
                className="w-full primary-gradient rounded-lg"
                onClick={handleContinue}
              >
                Personalize &amp; Preview
              </Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
