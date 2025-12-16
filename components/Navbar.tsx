"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Container from "./Container";
import Logo from "./Logo";
import ActiveLink from "./ActiveLink";
import { Button } from "./ui/button";
import { LucideShoppingBag, LucideMenu, LucideX } from "lucide-react";
import { useScreenSize } from "@/hooks/useScreenSize";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Saved Books", href: "/saved-books" },
  { name: "About Us", href: "/about-us" },
];

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

export default function Navbar() {
  const { isLargeScreen } = useScreenSize();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b">
      <Container>
        {isLargeScreen ? (
          <DesktopNav />
        ) : (
          <MobileNav isOpen={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
        )}
      </Container>
    </header>
  );
}

function DesktopNav() {
  return (
    <nav className="flex items-center gap-4 py-4">
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
        <Button
          className="text-primary-500 hover:bg-transparent hover:opacity-80 hover:text-primary-500 transition-all"
          variant="ghost"
          size="icon-lg"
          aria-label="Shopping bag"
        >
          <LucideShoppingBag className="w-5 h-5" />
        </Button>
        <Button className="primary-gradient font-medium" size="lg">
          Sign up
        </Button>
        <Button
          className="border-2 border-primary-500 text-primary-500 font-medium hover:bg-primary-500 hover:text-white transition-all duration-200"
          variant="ghost"
          size="lg"
        >
          Log in
        </Button>
      </div>
    </nav>
  );
}

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileNav({ isOpen, onOpenChange }: MobileNavProps) {
  const handleToggle = (): void => {
    onOpenChange(!isOpen);
  };

  const handleClose = (): void => {
    onOpenChange(false);
  };

  return (
    <div className="relative">
      <nav className="flex items-center justify-between py-4">
        <div className="w-fit size-14">
          <Logo className="h-14 object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="text-primary-500 hover:bg-transparent hover:opacity-80 hover:text-primary-500 transition-all"
            variant="ghost"
            size="icon"
            aria-label="Shopping bag"
          >
            <LucideShoppingBag className="w-5 h-5" />
          </Button>

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
              className="pb-6 pt-2 space-y-6 bg-linear-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-lg border border-primary-100 mx-2 mb-4 px-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Navigation Links */}
              <nav className="px-3 pt-4">
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
                        className="block px-4 py-3.5 text-lg font-medium rounded-xl hover:bg-white/80 active:bg-white transition-all"
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
                className="px-3 pt-2 border-t border-primary-200/50 space-y-3"
              >
                <Button
                  className="primary-gradient w-full font-medium shadow-sm hover:shadow-md transition-all"
                  size="lg"
                >
                  Sign up
                </Button>
                <Button
                  className="w-full border-2 border-primary-500 text-primary-500 font-medium hover:bg-primary-500 hover:text-white active:scale-95 transition-all duration-200"
                  variant="ghost"
                  size="lg"
                >
                  Log in
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
