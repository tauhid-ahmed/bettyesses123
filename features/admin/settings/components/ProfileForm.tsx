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
import { useTransition, useState } from "react";
import { updateProfile } from "../actions/update-profile";
import { profileSchema, ProfileSchema } from "../constants/validation";
import { UserProfile } from "../types";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { toast } from "sonner";

type ProfileFormProps = {
  initialData: UserProfile;
};

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [profilePicture, setProfilePicture] = useState<string | null>(
    initialData.profilePicture
  );

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData.fullName,
      email: initialData.email,
      location: initialData.location || "",
      phoneNumber: initialData.phoneNumber || "",
    },
  });

  const onSubmit = (data: ProfileSchema) => {
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const hasChanges = form.formState.isDirty;

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

      <ProfilePictureUpload
        currentImage={profilePicture}
        onImageChange={setProfilePicture}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sorento Baudeya"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="null@gmail.com"
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
                      placeholder="+1234567890"
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
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
