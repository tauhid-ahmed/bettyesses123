"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarProvider";
import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { signinPath } from "@/paths";

export default function DashboardFooter() {
  const { isExpanded } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push(signinPath());
  };

  return (
    <div className="py-12 flex flex-col gap-4 justify-start w-full">
      <Button
        onClick={handleLogout}
        className="bg-[#EEF6FF]"
        variant="ghost"
        size={!isExpanded ? "icon" : "lg"}
      >
        <LucideLogOut className="mr-2 h-4 w-4" />
        {isExpanded && "Logout"}
      </Button>
    </div>
  );
}
