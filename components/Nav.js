/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import ShoppingCartNav from "./ShoppingCartNav";

export default function Nav() {
  return (
    <nav className="relative flex justify-between items-center px-4 pt-4 pb-6 border-b border-neutral-800">
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
          <NavLinks />
        </ul>
      </div>
      <div className="flex space-x-4">
        <svg
          className=" text-neutral-200 hover-hover:hover:text-primary-600  transition-all cursor-pointer"
          fill="currentColor"
          width={40}
          height={40}
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 29 29"
        >
          <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z" />
        </svg>
        <ShoppingCartNav />
      </div>
    </nav>
  );
}
