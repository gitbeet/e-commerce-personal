import Link from "next/link";

export default function NavLinks({ hoverColor, size = "md" }) {
  const hoverClass = `hover-hover:hover:text-${hoverColor}`;

  return (
    <>
      <li
        className={`${hoverClass} "transition-all duration-[150] text-${size} `}
      >
        <Link href="/">Home page</Link>
      </li>
      <li
        className={`${hoverClass} "transition-all duration-[150] text-${size} `}
      >
        <Link href="/products">Products</Link>
      </li>
      {/* <li
        className={`${hoverClass} "transition-all duration-[150] text-${size} `}
      >
        <Link href="/profile">Profile</Link>
      </li> */}
      {/* <li
        className={`${hoverClass} "transition-all duration-[150] text-${size} `}
      >
        <Link href="/about">About</Link>
      </li> */}
    </>
  );
}
