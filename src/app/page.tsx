"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import HeroProjects from "@/components/HeroProjects";
import ParallaxImage from "@/components/ParallaxImage";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    // 1a. Tell the browser NOT to restore scroll position natively
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    // 1b. Force the page to the absolute top on mount
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

  // 2. Lock Scroll During Preloader
  useEffect(() => {
    if (isLoading) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoading]);

  // 3. Dynamically Measure Footer for Sticky Reveal
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <FilmGrain /> {/* The global TV static layer */}
      {/* The frosted glass preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" setLoading={setIsLoading} />}
      </AnimatePresence>
      <main className="relative">
        <Navbar />

        {/* MAIN CONTENT WRAPPER */}
        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* Interactive WebGL Header Section */}
          <HeroProjects />

          {/* Transitional Spacing Section */}
          <div className="h-[40vh] flex flex-col items-center justify-center text-zinc-900 px-8 text-center bg-zinc-100">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              The Archive
            </p>
          </div>

          {/* First Parallax: Full Screen background with augmented depth */}
          <ParallaxImage
            src="/images/parallax-1.jpg"
            alt="Full screen background"
            className="h-screen w-full"
          />

          {/* Spacing Section */}
          <div className="h-[60vh] flex items-center justify-center text-zinc-900 px-8 text-center bg-zinc-100">
            <SplitText text="Seamless spatial depth." delay={0.1} />
          </div>

          {/* Second Section: Augmented Parallax Window */}
          <div className="py-20 flex justify-center bg-zinc-200">
            <ParallaxImage
              src="/images/parallax-2.jpg"
              alt="Mid-page feature"
              className="h-[60vh] w-[90%] md:w-[70%] rounded-2xl shadow-2xl"
            />
          </div>

          {/* Final Section before Footer */}
          <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-900 px-8 text-center bg-zinc-100">
            <SplitText text="Keep Scrolling" />
            <p className="mt-8 text-xl font-medium tracking-widest uppercase text-zinc-500">
              The sticky footer awaits.
            </p>
          </div>
        </div>

        {/* STICKY FOOTER WRAPPER */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
