'use client';

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

import { toast } from "sonner";
import { UserProfile } from "@/features/profile/types";
import { ProfileFormData, profileSchema } from "@/features/profile/schemas";
import { uploadProfileImage } from "@/features/profile/actions/upload-image";
import { updateProfile } from "@/features/profile/actions/update-profile";


interface ProfileFormProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export default function ProfileForm({ profile, setProfile }: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(profile.image || null);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const getInitials = (first: string, last: string) =>
    `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const res = await uploadProfileImage(formData);
      if (res.success) {
        toast.success(res.message);
        if (res.data?.image) setProfileImage(res.data.image);
      } else {
        toast.error(res.message);
      }
    });
  };

  const onSubmit = (data: ProfileFormData) => {
    startTransition(async () => {
      // 1. Update Profile Info
      const profileRes = await updateProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (!profileRes.success) {
        toast.error(profileRes.message);
        return;
      }

      toast.success("Profile updated successfully");
      setProfile(profileRes.data);
      reset(profileRes.data);
    });
  };

  return (
    <div className="bg-primary-100/90 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <User className="w-5 h-5" /> Edit Profile
      </h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            {profileImage ? (
              <img src={profileImage} className="w-full h-full object-cover" />
            ) : (
              <span>{getInitials(profile.firstName, profile.lastName)}</span>
            )}
          </div>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Section */}
        <div className="mb-4">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input type="password" {...register("currentPassword")} placeholder="Current password" />
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="newPassword">New Password</Label>
          <Input type="password" {...register("newPassword")} placeholder="New password" />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => reset()} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
