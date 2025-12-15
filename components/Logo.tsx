import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="w-fit mx-auto">
      <Image src={logo} alt="Logo" width={100} height={100} />
    </Link>
  );
}
