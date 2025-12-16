import { cn } from "@/lib/utils";
import React from "react";

type PaddingSize = "sm" | "md" | "lg";

type GradientBorderProps = {
  className?: string;
  borderSize?: number;
  borderRadius?: number;
  children: React.ReactNode;
  gradient?: string;
  innerBg?: string;
  padding?: PaddingSize;
};

// Responsive padding classes: mobile (default) -> desktop (md breakpoint)
const paddingMap: Record<PaddingSize, string> = {
  sm: "p-2 md:p-3", // 8px -> 12px (0.75rem max)
  md: "p-3 md:p-5", // 12px -> 20px (1.25rem max)
  lg: "p-4 md:p-7", // 16px -> 28px (1.75rem max)
};

export default function GradientBorder({
  children,
  className,
  borderSize = 1,
  borderRadius = 24,
  gradient = "primary-gradient",
  innerBg = "bg-primary-100",
  padding = "md",
}: GradientBorderProps) {
  return (
    <div
      className={cn(gradient, className)}
      style={{
        padding: `${borderSize}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div
        className={cn(innerBg, paddingMap[padding], "w-full h-full")}
        style={{
          borderRadius: `${borderRadius - borderSize}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
