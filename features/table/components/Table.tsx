"use client";

import { UpDownArrowIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

type SortDirection = "asc" | "desc" | null;

type TableHeaderItemProps = {
  prop: string;
  currentSort: string | null;
  sortDirection: SortDirection;
  label?: string;
  children?: React.ReactNode;
  sortable?: boolean;
};

export function Table({ children }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto rounded-xl overflow-hidden">
      <table className="border-collapse rounded-xl overflow-hidden text-sm sm:text-base shadow-xs border border-primary-50 min-w-xl w-full">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: React.ComponentProps<"thead">) {
  return (
    <thead className="bg-primary-400 text-white sticky top-0 z-10">
      {children}
    </thead>
  );
}

export function TableBody({ children }: React.ComponentProps<"tbody">) {
  return <tbody className="bg-white">{children}</tbody>;
}

export function TableHeaderItem({
  prop,
  currentSort,
  sortDirection,
  label,
  children,
  sortable = true,
}: TableHeaderItemProps) {
  const searchParams = useSearchParams();
  const isActive = currentSort === prop;

  // Generate the sort URL based on current state
  const getSortUrl = () => {
    if (!sortable) return "#";

    const params = new URLSearchParams(searchParams?.toString() || "");
    let nextSort: string | null = null;

    if (!isActive) {
      nextSort = `${prop}:asc`;
    } else if (sortDirection === "asc") {
      nextSort = `${prop}:desc`;
    } else if (sortDirection === "desc") {
      nextSort = null;
    }

    if (nextSort) {
      params.set("sort", nextSort);
    } else {
      params.delete("sort");
    }

    return `?${params.toString()}`;
  };

  // Use label prop, children, or formatted prop name
  const displayLabel = label || children || formatHeaderLabel(prop);

  return (
    <th
      className={cn(
        "py-2 text-left align-middle border-b border-primary-100 first:pl-4 last:pr-4 [&:not(:first-child):not(:last-child)]:text-center [&:not(:first-child):not(:last-child)]:px-2"
      )}
    >
      {sortable ? (
        <Link
          href={getSortUrl()}
          scroll={false}
          className={cn(
            "group w-full flex items-center gap-2 px-2 py-1 truncate font-medium text-white transition cursor-pointer no-underline",
            { "text-white": isActive }
          )}
        >
          <span className="truncate">{displayLabel}</span>
          <span
            className={cn(
              "flex items-center justify-center transition-all size-4",
              { "rotate-180": isActive && sortDirection === "desc" }
            )}
          >
            <UpDownArrowIcon
              width={14}
              height={14}
              className={cn(
                "text-white opacity-0 group-hover:opacity-100 transition",
                { "opacity-100": isActive }
              )}
            />
          </span>
        </Link>
      ) : (
        <div className="w-full flex items-center gap-2 px-2 py-1 truncate font-medium text-white">
          <span className="truncate">{displayLabel}</span>
        </div>
      )}
    </th>
  );
}

export function TableRow({ children, className }: React.ComponentProps<"tr">) {
  return (
    <tr className={cn("border-b border-primary-100 text-sm", className)}>
      {children}
    </tr>
  );
}

export function TableBodyItem({
  children,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className="py-2 align-middle wrap-break whitespace-normal max-w-40 sm:max-w-none 
      px-4 first:px-6 last:px-2"
      {...props}
    >
      {children}
    </td>
  );
}

function formatHeaderLabel(key: string): string {
  return key
    .replace(/[-_]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
