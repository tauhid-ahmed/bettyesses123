import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Container({ children, className, size = "lg" }: Props) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 lg:px-8",
        {
          "max-w-344": size === "lg",
          "max-w-267.75": size === "md",
          "max-w-196.5": size === "sm",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
