import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="w-fit mx-auto">
      <Image
        className={className}
        src={logo}
        alt="Logo"
        width={100}
        height={100}
      />
    </Link>
  );
}
