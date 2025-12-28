"use client";

import { CartButton } from "@/features/cart/components/CartButton";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { AnimatePresence, motion, Variants } from "motion/react";
import { LucideMenu, LucideX } from "lucide-react";
import React from "react";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Session } from "next-auth";
import { ProfileWidget } from "./ProfileWidget";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const buttonVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconRotateVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 90 },
};

interface NavItem {
  name: string;
  href: string;
}

type Props = {
  navItems: NavItem[];
  session: Session | null;
};

export default function MobileNav({ navItems, session }: Props) {
  const [isOpen, onOpenChange] = React.useState(false);
  const handleToggle = (): void => {
    onOpenChange(!isOpen);
  };

  const handleClose = (): void => {
    onOpenChange(false);
  };

  const { isLargeScreen } = useScreenSize();

  if (isLargeScreen) return null;

  return (
    <div className="relative lg:hidden">
      <nav className="flex items-center justify-between py-4">
        <div className="w-fit size-14">
          <Logo className="h-14 object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          <ProfileWidget />

          <Button
            variant="ghost"
            size="icon"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="w-10 h-10 relative"
            onClick={handleToggle}
          >
            <motion.div
              variants={iconRotateVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {isOpen ? (
                <LucideX className="w-5 h-5" />
              ) : (
                <LucideMenu className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden -mx-10"
          >
            <motion.div
              className="pb-6 pt-2 space-y-2 bg-linear-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-lg border border-primary-100 mx-2 mb-4 px-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Navigation Links */}
              <nav className="px-1 pt-2">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <ActiveLink
                        className="block py-2 font-medium rounded-xl hover:bg-white/80 active:bg-white transition-all text-sm"
                        href={item.href}
                        onClick={handleClose}
                      >
                        {item.name}
                      </ActiveLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Actions */}
              <motion.div
                variants={buttonVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="border-t border-primary-200/50 space-y-3"
              >
                {!session && (
                  <>
                    <Button
                      className="primary-gradient w-full font-medium shadow-sm hover:shadow-md transition-all"
                      asChild
                    >
                      <Link href="/signup">Sign up</Link>
                    </Button>
                    <Button
                      className="w-full border-2 border-primary-500 text-primary-500 font-medium hover:bg-primary-500 hover:text-white active:scale-95 transition-all duration-200"
                      variant="ghost"
                      asChild
                    >
                      <Link href="/login">Log in</Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
