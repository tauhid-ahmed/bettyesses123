import Container from "./Container";
import Logo from "./Logo";
import ActiveLink from "./ActiveLink";
import { Button } from "./ui/button";
import { LucideShoppingBag, LucideShoppingCart } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Saved Books", href: "/saved-books" },
  { name: "About Us", href: "/about-us" },
];

export default function Navbar() {
  return (
    <header className="relative">
      <Container>
        <DesktopNav />
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
            <ActiveLink className="text-lg" href={item.href}>
              {item.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
      <div className="flex-1 flex justify-end items-center gap-4">
        <Button
          className="text-primary-500 hover:bg-transparent hover:opacity-80 hover:text-primary-500"
          variant="ghost"
          size="icon-lg"
        >
          <LucideShoppingBag />
        </Button>
        <Button className="primary-gradient" size="lg">
          Sign up
        </Button>
        <Button
          className="border border-primary-500 text-primary-500 hover:bg-primary-500 active:bg-primary-500 active:text-white hover:text-white"
          variant="ghost"
          size="lg"
        >
          Log in
        </Button>
      </div>
    </nav>
  );
}

function MobileNav() {
  return <></>;
}
