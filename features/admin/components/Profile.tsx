import Image from "next/image";
import { cn } from "@/lib/utils";

type ProfileProps = {
  name: string;
  role: string;
  imageUrl?: string | null;
  className?: string;
};

export default function Profile({
  name,
  role,
  imageUrl,
  className,
}: ProfileProps) {
  // Get first letter or initials from name
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "U";
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={cn(
        "bg-linear-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded py-1 px-2 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="relative size-8 rounded-full overflow-hidden bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="20px"
            />
          ) : (
            <span className="text-xl select-none">{getInitials(name)}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col min-w-0">
          <span className="text-sm font-medium text-primary-800 truncate">
            {name}
          </span>
          <span className="text-xs text-primary-600">{role}</span>
        </div>
      </div>
    </div>
  );
}
