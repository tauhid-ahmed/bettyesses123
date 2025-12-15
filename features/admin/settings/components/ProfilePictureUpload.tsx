"use client";

import { Camera } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

type ProfilePictureUploadProps = {
  currentImage: string | null;
  onImageChange: (image: string | null) => void;
};

export function ProfilePictureUpload({
  currentImage,
  onImageChange,
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to server and get URL
      // For now, create a local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-100">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Profile"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-600 font-semibold text-2xl">
              SB
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shadow-lg transition-colors"
        >
          <Camera className="h-4 w-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">Profile Picture</p>
        <p className="text-xs text-gray-500 mt-0.5">
          JPG, PNG or GIF. Max size 5MB
        </p>
      </div>
    </div>
  );
}
