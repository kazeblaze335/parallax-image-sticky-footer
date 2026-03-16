"use client";

import { useState } from "react";
import FloatingPaperNav from "@/components/FloatingPaperNav";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <div className="text-xl font-bold uppercase tracking-widest">Brand</div>

        {/* We replace the static list with a toggle button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Menu
        </button>
      </nav>

      {/* The WebGL Menu Overlay */}
      <FloatingPaperNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
