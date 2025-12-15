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

const paddingMap: Record<PaddingSize, string> = {
  sm: "0.75rem",
  md: "1.25rem",
  lg: "1.75rem",
};

export default function GradientBorder({
  children,
  className,
  borderSize = 1,
  borderRadius = 24,
  gradient = "primary-gradient",
  innerBg = "bg-gray-100",
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
        className={innerBg}
        style={{
          borderRadius: `${borderRadius - borderSize}px`,
          padding: paddingMap[padding],
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
