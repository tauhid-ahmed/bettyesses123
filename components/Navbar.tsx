import { getMe } from "@/actions/getMe";
import Container from "./Container";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { UserProfile } from "@/types/user-profile";

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

export default async function Navbar() {
  const session: UserProfile | null = await getMe();
  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 -z-10 backdrop-blur-md bg-white/5saturate-150 border-b border-primary-100/10"></div>
      <Container>
        <DesktopNav session={session} navItems={navItems} />
        <MobileNav session={session} navItems={navItems} />
      </Container>
    </header>
  );
}
