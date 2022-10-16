import Image from "next/image";
import Link from "next/link";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import ShoppingCartNav from "./ShoppingCartNav";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center p-4  border-b border-neutral-600">
      <div className="lg:hidden">
        <MobileMenuButton />
      </div>
      <Link href="/">
        <div className="cursor-pointer hidden lg:block">
          <Image
            src="/assets/logo.jpg"
            alt="brand logo"
            width={60}
            height={60}
          />
        </div>
      </Link>
      <div className="hidden lg:block  mr-auto ml-12">
        <NavLinks />
      </div>
      <Link href="/">
        <div className="cursor-pointer lg:hidden">
          <Image
            src="/assets/logo.jpg"
            alt="brand logo"
            width={60}
            height={60}
          />
        </div>
      </Link>
      <ShoppingCartNav />
    </nav>
  );
}
