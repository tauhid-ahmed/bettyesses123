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
  BadgePercent,
  Book,
  BookOpenCheck,
  ClipboardCheck,
  HandHeart,
  LucideUser,
  PanelsLeftBottom,
  Settings,
} from "lucide-react";
import { CgNotes } from "react-icons/cg";
import { Suspense } from "react";

const navItems = [
  {
    href: "/dashboard/overview",
    name: "Overview",
    icon: <PanelsLeftBottom />,
    children: [],
  },
  {
    href: "/dashboard/user-management",
    name: "User Management",
    icon: <LucideUser />,
    children: [],
  },
  {
    href: "/dashboard/order-management",
    name: "Order Management",
    icon: <ClipboardCheck />,
    children: [],
  },
  {
    href: "/dashboard/books",
    name: "Books",
    icon: <Book />,
    children: [],
  },
  {
    href: "/dashboard/privacy-and-policy",
    name: "Privacy Policy",
    icon: <BookOpenCheck />,
    children: [],
  },
  {
    href: "/dashboard/terms-and-condition",
    name: "Terms & Condition",
    icon: <CgNotes />,
    children: [],
  },
  {
    href: "/dashboard/promo-codes",
    name: "Promo Codes",
    icon: <BadgePercent />,
    children: [],
  },

  {
    href: "/dashboard/rating-reviews",
    name: "Rating & Reviews",
    icon: <HandHeart />,
    children: [],
  },
  {
    href: "/dashboard/settings",
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
