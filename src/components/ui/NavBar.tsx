"use client";

import { useState, useEffect } from "react";
import MagneticWrapper from "@/components/motion/MagneticWrapper";
import StairsMenu from "./StairsMenu";

export default function Navbar() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[90] px-6 md:px-8 py-6 flex justify-between items-start mix-blend-difference text-zinc-100 pointer-events-none">
        {/* THE EASTER EGG LOGO */}
        <div className="pointer-events-auto mt-2">
          <MagneticWrapper strength={0.1}>
            <div
              onClick={toggleTheme}
              className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity cursor-pointer p-4 -m-4 block select-none"
            >
              SOJU
            </div>
          </MagneticWrapper>
        </div>

        {/* The center space is now completely empty, creating massive negative space! */}
      </nav>

      {/* THE FLUSH NEON SQUARE BURGER BUTTON */}
      <div className="fixed top-0 right-0 z-[95] pointer-events-auto">
        <MagneticWrapper strength={0.2}>
          <div
            onClick={() => setMenuIsOpen(true)}
            className="flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-[#CCFF00] text-zinc-900 cursor-pointer group shadow-2xl transition-transform duration-500 hover:scale-105 origin-top-right"
          >
            <span className="mb-2 hover:opacity-50 transition-opacity leading-none text-xs font-bold tracking-[0.2em] uppercase">
              Menu
            </span>
            <svg
              width="32"
              height="8"
              viewBox="0 0 56 7"
              fill="none"
              className="transform transition-transform group-hover:scale-x-110 origin-center"
            >
              <line
                x1="56"
                y1="0.5"
                x2="0"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="56"
                y1="6.5"
                x2="28"
                y2="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </MagneticWrapper>
      </div>

      {/* Mount the Overlay Menu */}
      <StairsMenu isOpen={menuIsOpen} closeMenu={() => setMenuIsOpen(false)} />
    </>
  );
}
