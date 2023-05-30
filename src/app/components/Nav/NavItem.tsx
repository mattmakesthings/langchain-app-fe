'use client';
import Link from "next/link";
export default  function NavItem ({ text, href, active }: {
    text: string,
    href: string,
    active: boolean,
  }) {
  return (
    <Link href={href}>
      <div
        className={`nav__item ${
          active ? "active" : ""
        }`}
      >
        {text}
      </div>
    </Link>
  );
};
