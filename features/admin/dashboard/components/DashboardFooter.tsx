import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarProvider";
import { LucideLogOut } from "lucide-react";

export default function DashboardFooter() {
  const { isExpanded } = useSidebar();
  return (
    <div className="py-12 flex flex-col gap-4 justify-start w-full">
      <Button
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
