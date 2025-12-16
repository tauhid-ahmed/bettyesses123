"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: HeadingSize;
  asChild?: boolean;
  className?: string;
  align?: "left" | "center" | "right";
  weight?: "normal" | "medium" | "bold";
  color?: string;
}

const sizeClasses: Record<HeadingSize, string> = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
  h6: "text-base md:text-lg",
};

export default function Heading({
  children,
  size = "h2",
  asChild = false,
  className = "",
  align = "left",
  weight = "bold",
  color = "text-black",
  ...props
}: HeadingProps) {
  const Component = asChild ? Slot : size;
  return (
    <Component
      className={cn(
        sizeClasses[size],
        `text-${align}`,
        weight === "normal"
          ? "font-normal"
          : weight === "medium"
          ? "font-medium"
          : "font-bold",
        color,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
