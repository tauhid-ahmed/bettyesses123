"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="text-gray-600 hover:text-gray-900"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back to Movers
    </Button>
  );
}
