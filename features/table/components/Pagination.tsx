/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import PageLimits from "./PageLimits";
import { cn } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination({
  totalPages,
  currentPage,
  pageSize,
}: PaginationProps) {
  const searchParams = new URLSearchParams(useSearchParams());
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (page: number) => {
    page = Math.max(1, Math.min(page, totalPages));
    const params = new URLSearchParams(searchParams.toString());
    page === 1 ? params.delete("page") : params.set("page", page.toString());
    params.set("limit", pageSize.toString());
    const url = `?${params.toString()}`;
    startTransition(() => {
      router.push(url, { scroll: false });
    });
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start
    if (currentPage <= 3) {
      startPage = 2;
      endPage = Math.min(maxVisible, totalPages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisible + 1);
      endPage = totalPages - 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    totalPages >= 1 && (
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-gray-400 text-sm flex items-center gap-1">
          Showing <strong className="font-medium">{currentPage}</strong> of{" "}
          <strong className="font-medium">{totalPages}</strong>{" "}
          <div className="ml-2">
            <PageLimits />
          </div>
        </span>
        <nav className="flex justify-center gap-2 flex-wrap">
          <Button
            size="sm"
            disabled={currentPage === 1 || isPending}
            onClick={() => navigateToPage(currentPage - 1)}
            variant="outline"
          >
            <LucideChevronLeft /> Previous
          </Button>

          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  size="sm"
                  variant="ghost"
                  disabled
                >
                  ...
                </Button>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <Button
                key={pageNum}
                size="sm"
                variant={isActive ? "default" : "outline"}
                onClick={() => navigateToPage(pageNum)}
                disabled={isPending}
                className={cn(
                  "min-w-10",
                  isActive &&
                  "bg-[#0556AB] text-white hover:bg-[#044a92] pointer-events-none"
                )}
              >
                {pageNum}
              </Button>

            );
          })}

          <Button
            size="sm"
            disabled={currentPage >= totalPages || isPending}
            onClick={() => navigateToPage(currentPage + 1)}
            variant="outline"
          >
            Next <LucideChevronRight />
          </Button>
        </nav>
      </div>
    )
  );
}
