"use client";

import localFont from "next/font/local";
import Link from "next/link";

const neueMontreal = localFont({
  src: "../../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

export default function Footer() {
  return (
    // ADDED: dark:bg-zinc-900
    <footer className="h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-zinc-200 dark:bg-zinc-900 pt-32 pb-12 transition-colors duration-500">
      {/* Top Info Grid */}
      {/* ADDED: dark:text-zinc-400 */}
      <div className="w-full px-8 md:px-16 flex justify-between items-start text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
        <div className="flex flex-col gap-2">
          <p>NØRD OBJECTS</p>
          <p>Creative Studio</p>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <Link
            href="mailto:hello@nordobjects.com"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            hello@nordobjects.com
          </Link>
          <p>San Francisco, CA</p>
        </div>
      </div>

      {/* The Massive SOJU Graphic */}
      {/* ADDED: dark:text-zinc-100 */}
      <div
        className={`text-[25vw] leading-[0.75] tracking-tighter uppercase text-zinc-900 dark:text-zinc-100 transition-colors duration-500 ${neueMontreal.className}`}
      >
        SOJU<span className="text-[10vw] align-top relative top-4">®</span>
      </div>

      {/* Bottom Copyright & Socials */}
      {/* ADDED: dark:text-zinc-400 */}
      <div className="w-full px-8 md:px-16 flex justify-between items-end text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
        <p>© 2026</p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="#"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
