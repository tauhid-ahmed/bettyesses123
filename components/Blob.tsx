import { cn } from "@/lib/utils";

type BlobVariant = "primary" | "secondary" | "tertiary";
type BlobSize = "sm" | "md" | "lg";
type BlobIntent = "strong" | "weak";

type BlobPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type BlobProps = {
  variant?: BlobVariant;
  size?: BlobSize;
  intent?: BlobIntent;
  position?: BlobPosition;
  className?: string;
};

const VARIANT_CLASSES: Record<BlobVariant, string> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  tertiary: "bg-red-500",
};

const SIZE_CLASSES: Record<BlobSize, string> = {
  sm: "w-[25vw]",
  md: "w-[40vw]",
  lg: "w-[50vw]",
};

const INTENT_CLASSES: Record<BlobIntent, string> = {
  strong: "blur-[200px]",
  weak: "blur-[150px]",
};

const POSITION_CLASSES: Record<BlobPosition, string> = {
  // Top
  "top-left": "top-[-50%] left-[-50%]",
  "top-center": "top-[-50%] left-1/2 -translate-x-1/2",
  "top-right": "top-[-50%] right-[-50%]",

  // Center
  "center-left": "top-1/2 left-[-50%] -translate-y-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-right": "top-1/2 right-[-50%] -translate-y-1/2",

  // Bottom
  "bottom-left": "bottom-[-50%] left-[-50%]",
  "bottom-center": "bottom-[-50%] left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-[-50%] right-[-50%]",
};

export default function Blob({
  variant = "primary",
  size = "lg",
  intent = "strong",
  position = "top-left",
  className,
}: BlobProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute aspect-square min-w-48 select-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        INTENT_CLASSES[intent],
        POSITION_CLASSES[position],
        className
      )}
    />
  );
}
