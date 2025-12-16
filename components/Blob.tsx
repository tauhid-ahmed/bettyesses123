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
  animate?: boolean;
};

const VARIANT_CLASSES: Record<BlobVariant, string> = {
  primary: "bg-primary-500/50",
  secondary: "bg-secondary-500/50",
  tertiary: "bg-red-500/30",
};

const SIZE_CLASSES: Record<BlobSize, string> = {
  sm: "w-[30vh]",
  md: "w-[50vh]",
  lg: "w-[100vh]",
};

const INTENT_CLASSES: Record<BlobIntent, string> = {
  strong: "blur-[350px]",
  weak: "blur-[150px]",
};

const POSITION_CLASSES: Record<BlobPosition, string> = {
  // Top
  "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
  "top-center": "top-1/2 left-1/2",
  "top-right": "top-0 right-0 translate-x-1/4",

  // Center
  "center-left": "top-1/2 left-0 -translate-y-1/2 -translate-x-1/6",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-right": "top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2",

  // Bottom
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-[-50%] left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/6",
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
        "pointer-events-none absolute aspect-square min-w-96 select-none rounded-full",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        INTENT_CLASSES[intent],
        POSITION_CLASSES[position],
        className
      )}
    />
  );
}
