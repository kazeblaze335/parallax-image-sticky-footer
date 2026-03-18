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

  useEffect(() => {
    if (isLoading) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoading]);

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
      <FilmGrain />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" setLoading={setIsLoading} />}
      </AnimatePresence>

      <main className="relative">
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* 1. Intro Typography */}
          <div className="h-[40vh] flex flex-col items-center justify-center pt-32 text-zinc-900 px-8 text-center bg-zinc-100">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
              The Archive
            </p>
          </div>

          {/* 2. Seamless Spatial Depth (FIXED SYNC) */}
          <div className="h-[60vh] flex items-center justify-center text-zinc-900 px-8 text-center bg-zinc-100">
            {/* We wait for isLoading to be false. 
                Then we add a 0.6s delay so the preloader has time to slide up and reveal the animation happening! */}
            {!isLoading && (
              <SplitText text="Seamless spatial depth." delay={0.6} />
            )}
          </div>

          {/* 3. First Parallax: Full Screen background with EXTREME DEPTH */}
          <ParallaxImage
            src="/images/parallax-1.jpg"
            alt="Full screen background"
            className="h-screen w-full"
            lgParallax={true}
          />

          {/* 4. Interactive WebGL Accordion Section */}
          <HeroProjects />

          {/* 5. Second Parallax Window (Standard Depth) */}
          <div className="py-20 flex justify-center bg-zinc-200">
            <ParallaxImage
              src="/images/parallax-2.jpg"
              alt="Mid-page feature"
              className="h-[60vh] w-[90%] md:w-[70%] rounded-2xl shadow-2xl"
            />
          </div>

          {/* 6. Final Section before Footer */}
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
