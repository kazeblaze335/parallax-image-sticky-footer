"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-zinc-100">
      {/* Logo pointing back to Home */}
      <Link
        href="/"
        className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
      >
        NØRD OBJECTS
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
        <Link href="/" className="hover:opacity-50 transition-opacity">
          Home
        </Link>

        {/* The freshly wired Projects link! */}
        <Link href="/work" className="hover:opacity-50 transition-opacity">
          Projects
        </Link>

        <Link href="/about" className="hover:opacity-50 transition-opacity">
          About Us
        </Link>
      </div>
    </nav>
  );
}
