"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";

type ActiveLinkProps = {
  exact?: boolean;
} & React.ComponentProps<"a">;

export default function DashboardActiveLink({
  href = "",
  className,
  children,
}: ActiveLinkProps) {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href; // Remove the isExpanded condition

  console.log(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-y-2.5 rounded-xl whitespace-nowrap",
        isActive && "bg-primary-600 text-white",
        !isActive && "hover:bg-primary-600 hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
