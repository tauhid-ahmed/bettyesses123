"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signinPath } from "@/paths";
import { UserData } from "@/types/next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  user: UserData;
};

const role = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export function ProfileWidget({ user }: Props) {
  const name = user?.firstName + " " + user?.lastName;

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
            <span className="text-xs hidden md:inline">{role[user?.role]}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <SignOutButton />
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
    router.push(signinPath());
  };
  return (
    <Button className="w-full" onClick={handleSignOut} variant="destructive">
      Sign out
    </Button>
  );
}
