"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isNightMode, setIsNightMode] = useState(false);

  // Check the initial theme when the component mounts
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsNightMode(true);
    }
  }, []);

  // The toggle function
  const toggleTheme = () => {
    if (isNightMode) {
      document.documentElement.classList.remove("dark");
      setIsNightMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsNightMode(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-zinc-100">
      {/* Logo */}
      <Link
        href="/"
        className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
      >
        NØRD OBJECTS
      </Link>

      {/* Navigation Links & Toggle */}
      <div className="flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
        <Link
          href="/"
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          Home
        </Link>

        <Link
          href="/work"
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          Projects
        </Link>

        <Link
          href="/about"
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          About Us
        </Link>

        {/* =======================================================
            THE DAY / NIGHT TOGGLE (Fixed Width)
            ======================================================= */}
        <button
          onClick={toggleTheme}
          // ADDED: w-[130px] flex justify-center items-center
          className="ml-4 md:ml-8 border border-zinc-100 px-4 py-1.5 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-300 w-[130px] flex justify-center items-center"
        >
          {isNightMode ? "Day Mode" : "Night Mode"}
        </button>
      </div>
    </nav>
  );
}
