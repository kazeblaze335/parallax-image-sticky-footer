"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    // Fixed to the top, pointer-events-none on the wrapper ensures it doesn't block clicks below it
    <header className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
        >
          NØRD OBJECTS
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="pointer-events-auto flex gap-8">
        <Link
          href="/"
          className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
        >
          Projects
        </Link>
        <Link
          href="/about"
          className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
        >
          About Us
        </Link>
      </nav>
    </header>
  );
}
