"use client";

import { ChevronsRight } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarProvider";
import DashboardLogoutButton from "./DashboardFooter";

type DashboardSidebarProps = {
  children: React.ReactNode;
};

export default function DashboardSidebar({ children }: DashboardSidebarProps) {
  const { isCollapsedSidebar } = useSidebar();

  return (
    <motion.nav
      className={cn(
        "h-full flex flex-col gap-2 z-50 sticky top-0 whitespace-nowrap px-4 shadow-xs bg-white text-base border-r border-gray-100"
      )}
      style={{
        width: isCollapsedSidebar
          ? "var(--_sidebar-collapsed)"
          : "var(--_sidebar-expanded)",
      }}
      animate={{
        width: isCollapsedSidebar
          ? "var(--_sidebar-collapsed)"
          : "var(--_sidebar-expanded)",
      }}
    >
      <div className="absolute right-0 top-0 z-10">
        <SidebarToggleButton />
      </div>
      <SidebarHeader />

      <div className="flex-1 space-y-(--_sidebar-spacing) -mr-4 pr-4">
        {children}
      </div>
      <DashboardLogoutButton />
    </motion.nav>
  );
}

function SidebarHeader() {
  const { isExpanded } = useSidebar();
  return (
    <div className="px-5 -mx-5 flex gap-2 items-center h-16 relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("shrink-0 flex w-full gap-2 text-center")}
      >
        {!isExpanded && (
          <strong className="font-bold leading-none py-4 px-1">JH</strong>
        )}

        {isExpanded && (
          <strong className="font-bold leading-none p-4 text-lg">
            Job Hive
          </strong>
        )}
      </motion.div>
    </div>
  );
}

export function SidebarToggleButton() {
  const { isExpanded, toggleSidebarCollapse } = useSidebar();
  return (
    <button className="p-1 cursor-pointer" onClick={toggleSidebarCollapse}>
      <ChevronsRight
        className={cn(
          "size-4 text-gray-500",
          isExpanded ? "-scale-100" : "scale-100"
        )}
      />
    </button>
  );
}
