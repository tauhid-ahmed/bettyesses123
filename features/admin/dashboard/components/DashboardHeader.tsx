import { useState, useEffect } from "react";
import { getUserProfile } from "@/features/admin/settings/actions/get-user-profile";
import { UserProfile } from "@/features/admin/settings/types";
import Link from "next/link";
import Profile from "../../components/Profile";


export default function DashboardHeader() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile in header:", error);
      }
    };
    fetchProfile();
  }, []);

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Loading...";

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-linear-to-r from-[#0556AB] to-[#EEF6FF] text-white h-16">
      <Link
        href={"/"}
        className="font-medium md:text-lg lg:text-xl cursor-pointer"
      >
        <h2 className="text-[#FFFFFF] font-medium text-[18px]">{profile?.firstName} {profile?.lastName}</h2>
      </Link>
      <Profile
        name={fullName}
        role={profile?.role || "Admin"}
        imageUrl={profile?.image}
      />
    </div>
  );
}
