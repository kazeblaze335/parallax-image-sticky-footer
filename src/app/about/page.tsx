"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/NavBar";
import FilmGrain from "@/components/FilmGrain";
import InfiniteVerticalLoop from "@/components/InfiniteVerticalLoop";

export default function AboutPage() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <FilmGrain /> {/* The global cinematic film grain */}
      <main className="relative bg-zinc-100 min-h-screen overflow-hidden">
        {/* The global navigation bar */}
        <Navbar />

        {/* MAIN CONTENT WRAPPER
            We add top padding (pt-32) so the top of the infinite loop 
            safely clears your fixed Navbar when the page first loads.
        */}
        <div className="pt-32 w-full">
          <InfiniteVerticalLoop />
        </div>
      </main>
    </>
  );
}
