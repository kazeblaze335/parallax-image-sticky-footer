"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import ParallaxImage from "@/components/ParallaxImage";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import VimeoSection from "@/components/VimeoSection";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain"; // Import the new static fuzz

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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
      <FilmGrain /> {/* The global TV static layer */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" setLoading={setIsLoading} />}
      </AnimatePresence>
      <main className="relative">
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          <div className="h-screen flex items-center justify-center text-zinc-900 pt-20 px-8">
            <h1 className="flex flex-col items-center text-center">
              {/* No more '!isLoading' wrapper! The components exist, but their internal Framer variants wait for the delay. */}
              <SplitText text="Immersive" delay={1.4} />
              <SplitText text="Digital Flow" delay={1.6} />
            </h1>
          </div>

          <ParallaxImage
            src="/test-image-1.jpg"
            alt="Full screen background"
            className="h-screen w-full"
            showWebGL={true}
          />

          <div className="h-[60vh] flex items-center justify-center text-zinc-900 px-8 text-center">
            <SplitText text="Seamless spatial depth." delay={0.1} />
          </div>

          <div className="py-20 flex justify-center bg-zinc-200">
            <ParallaxImage
              src="/test-image-2.jpg"
              alt="Rectangular window parallax"
              className="h-[60vh] w-[90%] md:w-[70%] rounded-2xl shadow-2xl"
            />
          </div>

          <VimeoSection videoId="76979871" />

          <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-900 px-8 text-center">
            <SplitText text="Keep Scrolling" />
            <p className="mt-8 text-xl font-medium tracking-widest uppercase text-zinc-500">
              The sticky footer awaits.
            </p>
          </div>
        </div>

        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
