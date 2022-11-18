/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import ShoppingCartNav from "./ShoppingCartNav";
import UserButton from "./UserButton";

export default function Nav() {
  const { toggleUserModal } = useModal();

  return (
    <nav className="relative flex justify-between items-center px-4 pt-4 pb-6 border-b border-neutral-800 min-w-[100vw]">
      <div className="lg:hidden">
        <MobileMenuButton />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
        <Link href="/">
          <div className="cursor-pointer hidden lg:flex items-center">
            <Image
              src="/assets/logo.jpg"
              alt="brand logo"
              width={137}
              height={40}
            />
          </div>
        </Link>

        <Link href="/">
          <div className="cursor-pointer hidden  items-center md:flex lg:hidden">
            <Image
              src="/assets/logo.jpg"
              alt="brand logo"
              width={137}
              height={40}
            />
          </div>
        </Link>
        <Link href="/">
          <div className="flex items-center cursor-pointer  md:hidden bg-neutral-900">
            <Image
              src="/assets/logo-mobile.jpg"
              alt="brand logo"
              width={48}
              height={40}
            />
          </div>
        </Link>
      </div>
      <div className="hidden lg:block  mr-auto ml-12">
        <ul className="flex  text-xl uppercase tracking-widest space-x-4">
          <NavLinks size="sm" />
        </ul>
      </div>
      <div className="flex space-x-4">
        <UserButton />
        <ShoppingCartNav />
      </div>
    </nav>
  );
}
