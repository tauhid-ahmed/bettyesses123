"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/types/user-profile";

type Props = {
  user: UserProfile;
};

const role = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export function ProfileWidget({ user }: Props) {
  const name = user?.firstName + " " + user?.lastName;
  console.log(user);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";
  const isUser = user?.role === "USER";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex-col md:flex-row md:h-11 primary-gradient gap-0 md:gap-1"
        >
          <ProfilePicture name={name} image={user?.image} />
          <span className="text-left leading-none hidden md:block">
            <span className="text-xs md:text-sm">{name}</span>
            <br />
            <span className="text-xs hidden md:inline">
              {role[user?.role as keyof typeof role]}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 rounded-lg" align="center">
        {isAdmin ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutButton />
          </>
        ) : isUser ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer ">
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/orders" className="cursor-pointer">
                My Order
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutButton />
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ProfilePictureProps = {
  image: string | null | undefined;
  name: string;
};

function ProfilePicture({ name, image }: ProfilePictureProps) {
  return (
    <div className="flex items-center justify-center border-2 border-primary-100 rounded-full size-6 md:size-8">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={34}
          height={34}
          className="rounded-full"
        />
      ) : (
        <span className="text-primary-100 font-bold md:text-lg">{name[0]}</span>
      )}
    </div>
  );
}

function SignOutButton() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      className="cursor-pointer"
      variant="destructive"
    >
      Log Out
    </DropdownMenuItem>
  );
}
