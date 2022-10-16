import Image from "next/image";
import Link from "next/link";

export default function ShoppingCartNav() {
  return (
    <Link href="/checkout">
      <div className="relative cursor-pointer ">
        <Image
          src="/assets/icon-shopping-cart.png"
          alt="shopping cart icon"
          width={35}
          height={35}
        />
        <div className="absolute top-[40%] left-[50%] flex items-center justify-center   w-6 h-6 rounded-full bg-primary-500 font-bold">
          <p>3</p>
        </div>
      </div>
    </Link>
  );
}
