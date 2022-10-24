import Link from "next/link";

export default function NavLinks({ hoverColor }) {
  const hoverClass = `hover-hover:hover:text-${hoverColor}`;

  return (
    <>
      <li className={hoverClass + " transition-all duration-[150]"}>
        <Link href="/">Home</Link>
      </li>
      <li className={hoverClass + " transition-all duration-[150]"}>
        <Link href="/products">Products</Link>
      </li>
      <li className={hoverClass + " transition-all duration-[150]"}>
        <Link href="/profile">Profile</Link>
      </li>
      <li className={hoverClass + " transition-all duration-[150]"}>
        <Link href="/about">About</Link>
      </li>
    </>
  );
}
