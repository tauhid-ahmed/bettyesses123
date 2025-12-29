"use client";

import { createContext, useContext } from "react";
import { UserProfile } from "@/types/user-profile";

interface UserProfileProviderProps {
  children: React.ReactNode;
  userProfile: UserProfile | null;
}

const UserProfileContext = createContext<UserProfile | null>(null);

export default function UserProfileProvider({
  children,
  userProfile,
}: UserProfileProviderProps) {
  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === null) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
