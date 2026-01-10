"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition, useState, useRef } from "react";
import { profileSchema, ProfileSchema } from "../constants/validation";
import { UserProfile } from "../types";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { updateProfile } from "../actions/update-profile";

type ProfileFormProps = {
  initialData: UserProfile;
};

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(initialData.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      location: initialData.location ?? "",
      phoneNumber: initialData.phoneNumber ?? "",
    },
  });

  const onSubmit = (data: ProfileSchema) => {
    startTransition(async () => {
      try {
        let imagePath = initialData.image;

        // if (selectedFile) {
        //   const formData = new FormData();
        //   formData.append("image", selectedFile);

        //   const uploadRes = await fetch("/api/admin/users/upload-image", {
        //     method: "POST",
        //     body: formData,
        //   });

        //   const uploadData = await uploadRes.json();

        //   if (!uploadRes.ok) {
        //     toast.error(uploadData.message || "Failed to upload image");
        //     return;
        //   }

        //   imagePath = uploadData.data;
        // }

        const res = await updateProfile({
          ...data,
          image: imagePath,
          location: data.location || "",
          phoneNumber: data.phoneNumber || "",
        });

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        setSelectedFile(null);
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
    });
  };

  const hasChanges = form.formState.isDirty || selectedFile !== null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your account profile information
        </p>
      </div>

      <div>
        <div className=" flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div>
              <div className="flex flex-col items-center">
                {/* Profile Picture Container */}
                <div
                  className="relative cursor-pointer group"
                  onClick={handleImageClick}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                        <span className="text-4xl text-white font-semibold">
                          {initialData.firstName?.[0] || "U"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Camera Icon Button */}
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg group-hover:bg-blue-600 transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File Name Display */}
                {selectedFile && (
                  <p className="mt-4 text-sm text-gray-600">
                    Selected:{" "}
                    <span className="font-medium">{selectedFile.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane@admin.com"
                      className="border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York, USA"
                      className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567890"
                      className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isPending || !hasChanges}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || !hasChanges}
              className="bg-[#00244A] hover:bg-blue-900 text-white"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
