"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePersonalizeBook } from "../context/PersonalizeBookContext";

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
    <div className="w-full max-w-lg mx-auto p-8">
      {!preview ? (
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50/50">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                </div>
              ))}
            </div>

            <p className="text-gray-600 mb-2">Upload a photo of your child</p>

            <label htmlFor="image-upload">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
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

            <p className="text-xs text-gray-500 mt-2">Max file size 10MB</p>
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
              type="button"
              className="w-full mt-4"
              size="lg"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
