"use client";

import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin } from "lucide-react";

// Zod Schema for Profile Form
const profileSchema = z
  .object({
    user: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    streetAddress: z.string().min(5, "Street address is required"),
    aptBuilding: z.string().optional().or(z.literal("")),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    code: z.string().regex(/^\d{4,6}$/, "Invalid postal code"),
    countryRegion: z.string().min(2, "Country/Region is required"),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

type ProfileFormData = z.infer<typeof profileSchema>;

// Context Type
interface ProfileContextType {
  profileData: ProfileFormData | null;
  updateProfile: (data: ProfileFormData) => Promise<void>;
  isLoading: boolean;
}

// Create Context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Context Provider Component
const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // This is where you'll integrate your server action
      // Example: await saveProfileAction(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProfileData(data);
      console.log("Profile updated:", data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use Profile Context
const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

// Main Profile Form Component
const ProfileForm: React.FC = () => {
  const { updateProfile, isLoading } = useProfile();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      streetAddress: "",
      aptBuilding: "",
      city: "",
      state: "",
      code: "",
      countryRegion: "Bangladesh",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile(data);
  };

  const handleCancel = () => {
    reset();
    setProfileImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">
          Update profile & personal details whenever you're ready.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Edit Profile Card */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Edit Profile
              </h2>

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
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

              {/* User Name */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="user">User</Label>
                <Input
                  id="user"
                  {...register("user")}
                  placeholder="Enter your name"
                  className={errors.user ? "border-red-500" : ""}
                />
                {errors.user && (
                  <p className="text-red-500 text-sm">{errors.user.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  placeholder="Enter new password"
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>

              {/* Country/Region */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="countryRegion">Country/Region</Label>
                <Select
                  value={watch("countryRegion")}
                  onValueChange={(value) => setValue("countryRegion", value)}
                >
                  <SelectTrigger
                    className={errors.countryRegion ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
                {errors.countryRegion && (
                  <p className="text-red-500 text-sm">
                    {errors.countryRegion.message}
                  </p>
                )}
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="First name"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Last name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="+880 1234567890"
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Street Address */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="streetAddress">Street address</Label>
                <Input
                  id="streetAddress"
                  {...register("streetAddress")}
                  placeholder="Enter street address"
                  className={errors.streetAddress ? "border-red-500" : ""}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              {/* Apt / Building */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="aptBuilding">Apt # Building co.</Label>
                <Input
                  id="aptBuilding"
                  {...register("aptBuilding")}
                  placeholder="Apartment or building"
                />
              </div>

              {/* City, State, Code */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="City"
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={watch("state")}
                    onValueChange={(value) => setValue("state", value)}
                  >
                    <SelectTrigger
                      className={errors.state ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                      <SelectItem value="Chittagong">Chittagong</SelectItem>
                      <SelectItem value="Sylhet">Sylhet</SelectItem>
                      <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    {...register("code")}
                    placeholder="Code"
                    className={errors.code ? "border-red-500" : ""}
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm">
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button type="button" variant="outline" className="flex-1">
                  Add New Address
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  Update Shipping Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <ProfileProvider>
      <ProfileForm />
    </ProfileProvider>
  );
}

// ============================================
// SERVER ACTION INTEGRATION (for reference)
// ============================================
//
// Create a separate file: app/actions/profile.ts
//
// 'use server'
//
// import { z } from 'zod';
// import { profileSchema } from './schemas';
//
// type ProfileFormData = z.infer<typeof profileSchema>;
//
// export async function saveProfileAction(data: ProfileFormData) {
//   try {
//     // Validate data server-side
//     const validated = profileSchema.parse(data);
//
//     // Save to database
//     // await db.user.update({ where: { id: userId }, data: validated });
//
//     return { success: true, data: validated };
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return { success: false, errors: error.errors };
//     }
//     return { success: false, error: 'Failed to save profile' };
//   }
// }
//
// Then in your component:
// import { saveProfileAction } from '@/app/actions/profile';
//
// const updateProfile = async (data: ProfileFormData) => {
//   const result = await saveProfileAction(data);
//   if (result.success) {
//     // Handle success
//   } else {
//     // Handle errors
//   }
// }
