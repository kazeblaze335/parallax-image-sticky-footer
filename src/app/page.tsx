"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/NavBar";
import HeroProjects from "@/components/HeroProjects";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import SplitText from "@/components/SplitText";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <FilmGrain />
      {/* ADDED: dark:bg-zinc-950 and dark:text-zinc-100 */}
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip transition-colors duration-500">
        <Navbar />

        {/* This wrapper slides up over the fixed footer */}
        <div
          className="relative z-10 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* 1. THE HERO SECTION */}
          <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-16">
            {/* ADDED: dark:text-zinc-400 */}
            <p className="mb-8 text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              The Archive
            </p>
            <SplitText text="Seamless Spatial" />
            <SplitText text="Depth." delay={0.2} />
          </div>

          {/* 2. THE ACCORDION COMPONENT */}
          <HeroProjects />

          {/* 3. THE SECOND OVERSIZE TEXT */}
          {/* ADDED: dark:bg-zinc-950 */}
          <div className="h-screen flex flex-col items-center justify-center px-8 text-center bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500">
            <SplitText text="Keep Scrolling" playOnce={true} />
            {/* ADDED: dark:text-zinc-400 */}
            <p className="mt-8 text-xl font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
              The sticky footer awaits.
            </p>
          </div>
        </div>

        {/* THE FOOTER WRAPPER */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
