"use client";

import Image from "next/image";
import Profile from "../../components/Profile";
import Link from "next/link";

// import { usePathname } from "next/navigation";

const APP_NAME = process.env.APP_NAME || "Job Hive";

// const headerTitles = {
//   "/": APP_NAME,
//   "/user-management": APP_NAME,
//   "/mover-management": APP_NAME,
//   "/revenue": APP_NAME,
//   "/refund-request": APP_NAME,
//   "/provider-approval": APP_NAME,
//   "/complaint-box": APP_NAME,
//   "/settings": APP_NAME,
// };

export default function DashboardHeader() {
  // const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-linear-to-r from-[#0556AB] to-[#EEF6FF] text-white h-16">
      <Link
        href={"/"}
        className="font-medium md:text-lg lg:text-xl cursor-pointer"
      >
        <h2 className="text-[#FFFFFF] font-medium text-[18px]">My Jewish Tales</h2>
      </Link>
      <Profile
        name="Seema Badaya"
        role="Admin"
        imageUrl="https://i.pravatar.cc/300?img=12"
      />
    </div>
  );
}
