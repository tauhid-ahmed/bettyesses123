"use client";

import SidebarProvider from "@/features/admin/dashboard/components/SidebarProvider";
import {
  DashboardContainer,
  DashboardHeader,
  DashboardSidebar,
} from "@/features/admin/dashboard/components";
import {
  DashboardHeaderContainer,
  DashboardMainContainer,
  DashboardSidebarContainer,
} from "@/features/admin/dashboard/components/DashboardContainer";
import DashboardNavigation from "@/features/admin/dashboard/components/DashboardNavigation";
import {
  BookOpenCheck,
  CirclePoundSterling,
  FileUser,
  LucideUser,
  LucideUserPlus,
  PanelsLeftBottom,
  Settings,
  UserCog,
  UserRoundPen,
} from "lucide-react";
import { Suspense } from "react";

const navItems = [
  {
    href: "/",
    name: "Overview",
    icon: <PanelsLeftBottom />,
    children: [],
  },
  {
    href: "/user-management",
    name: "User Management",
    icon: <LucideUser />,
    children: [],
  },
  {
    href: "/mover-management",
    name: "Mover Management",
    icon: <LucideUserPlus />,
    children: [],
  },
  {
    href: "/revenue",
    name: "Revenue",
    icon: <CirclePoundSterling />,
    children: [],
  },
  {
    href: "/refund-request",
    name: "Refund Request",
    icon: <UserRoundPen />,
    children: [],
  },
  {
    href: "/provider-approval",
    name: "Provider Approval",
    icon: <FileUser />,
    children: [],
  },
  {
    href: "/complaint-box",
    name: "Complaint Box",
    icon: <UserCog />,
    children: [],
  },
  {
    href: "/privacy-and-policy",
    name: "Privacy Policy",
    icon: <BookOpenCheck />,
    children: [],
  },
  {
    href: "/settings",
    name: "Settings",
    icon: <Settings />,
    children: [],
  },
];

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardContainer>
        <DashboardSidebarContainer>
          <DashboardSidebar>
            <DashboardNavigation items={navItems} />
          </DashboardSidebar>
        </DashboardSidebarContainer>
        <DashboardHeaderContainer>
          <DashboardHeader />
        </DashboardHeaderContainer>
        <DashboardMainContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="p-4">{children}</div>
          </Suspense>
        </DashboardMainContainer>
      </DashboardContainer>
    </SidebarProvider>
  );
}
