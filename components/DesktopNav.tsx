"use client";

import { CartButton } from "@/features/cart/components/CartButton";
import ActiveLink from "./ActiveLink";
import Logo from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Session } from "next-auth";
import { ProfileWidget } from "./ProfileWidget";

interface NavItem {
  name: string;
  href: string;
}

type Props = {
  navItems: NavItem[];
  session: Session | null;
};

export default function DesktopNav({ navItems, session }: Props) {
  const { isLargeScreen } = useScreenSize();

  if (!isLargeScreen) return null;
  return (
    <nav className="hidden lg:flex items-center gap-4 py-4">
      <div className="flex-1">
        <Logo />
      </div>
      <ul className="flex gap-6 lg:gap-10">
        {navItems.map((item) => (
          <li key={item.href}>
            <ActiveLink
              className="text-lg font-medium transition-colors"
              href={item.href}
            >
              {item.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
      <div className="flex-1 flex justify-end items-center gap-3">
        <CartButton />

        {session ? (
          <ProfileWidget />
        ) : (
          <>
            <Button className="primary-gradient font-medium" size="lg" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button
              className="border-2 border-primary-500 text-primary-500 font-medium hover:bg-primary-500 hover:text-white transition-all duration-200"
              variant="ghost"
              size="lg"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
