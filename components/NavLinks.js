import Link from "next/link";

export default function NavLinks() {
  return (
    <ul className="flex text-xl uppercase tracking-widest space-x-4">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/products">Products</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
