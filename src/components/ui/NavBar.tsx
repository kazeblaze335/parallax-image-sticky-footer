"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

// The exact WAAPI animation from the reference repo!
const pageAnimation = () => {
  // 1. The old page scales up slightly, rotates, and fades out (Push Back)
  document.documentElement.animate(
    [
      { scale: 1, transform: "translateY(0%)", rotate: "0deg", opacity: 1 },
      {
        scale: 1.2,
        transform: "translateY(-10%)",
        rotate: "-5deg",
        opacity: 0,
      },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  // 2. The new page slides up from the bottom over the old page
  document.documentElement.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
    {
      duration: 1200,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};

export default function Navbar() {
  const [isNightMode, setIsNightMode] = useState(false);
  const router = useTransitionRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsNightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isNightMode) {
      document.documentElement.classList.remove("dark");
      setIsNightMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsNightMode(true);
    }
  };

  // Custom navigation handler to trigger the transition
  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (pathname === path) return;

      router.push(path, {
        onTransitionReady: pageAnimation,
      });
    };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-zinc-100">
      <Link
        href="/"
        onClick={handleNavigation("/")}
        className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
      >
        NØRD OBJECTS
      </Link>

      <div className="flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
        <Link
          href="/"
          onClick={handleNavigation("/")}
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          Home
        </Link>

        <Link
          href="/work"
          onClick={handleNavigation("/work")}
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          Projects
        </Link>

        <Link
          href="/about"
          onClick={handleNavigation("/about")}
          className="hover:opacity-50 transition-opacity hidden md:block"
        >
          About Us
        </Link>

        <button
          onClick={toggleTheme}
          className="ml-4 md:ml-8 border border-zinc-100 px-4 py-1.5 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-300 w-[130px] flex justify-center items-center"
        >
          {isNightMode ? "Day Mode" : "Night Mode"}
        </button>
      </div>
    </nav>
  );
}
