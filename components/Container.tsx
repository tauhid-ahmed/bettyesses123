import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  size: "sm" | "lg";
};

export default function Container({ children, size = "lg" }: Props) {
  return (
    <div
      className={cn("w-full mx-auto px-8", {
        "max-w-332": size === "lg",
        "max-w-196.5": size === "sm",
      })}
    >
      {children}
    </div>
  );
}
